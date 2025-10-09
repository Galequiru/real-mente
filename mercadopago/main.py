from os import getenv
from typing import TypedDict, Any
from fastapi.responses import JSONResponse
from mercadopago import SDK
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from json import dumps

load_dotenv()
ACCESS_TOKEN = getenv('MP_ACCESS_TOKEN')

sdk = SDK(ACCESS_TOKEN)

app = FastAPI()

# allow cors
app.add_middleware(
	CORSMiddleware,
	allow_origins=['*'],
	allow_credentials=True,
	allow_methods=['*'],
	allow_headers=['*'],
)

@app.exception_handler(Exception)
def exception_handler(_: Request, err: Exception):
	return JSONResponse({
		'error': str(err)
	}, 500)

@app.get('/ping')
def ping():
	return JSONResponse('pong')

class PaymentRequest(BaseModel):
	email: str
	price: float
	title: str
	products: list[str]

@app.post('/create_payment')
def create_payment(data: PaymentRequest):
	return from_response(sdk.preference().create({
		'items': [
			{
				'title': data.title,
				'quantity': 1,
				'currency_id': 'BRL',
				'unit_price': data.price
			}
		],
		'external_reference': dumps({
			'email': data.email,
			'products': data.products
		}, separators=(',', ':'))
	}))

@app.post('/get_payment/{preference_id}')
def get_payment(preference_id: str):
	payment = sdk.merchant_order().search({
		'preference_id': preference_id
	})

	# checks if the elements list exists and is not empty
	if elements := payment['response']['elements']:
		return JSONResponse(elements[0], 200)

	return JSONResponse({
		'message': f'No preference for id: {preference_id}'
	}, 404)

class MercadoPagoResponse(TypedDict):
	response: Any
	status: int

def from_response(data: MercadoPagoResponse) -> JSONResponse:
	"""Helper function that creates a JSONResponse from a returned dict of mercadopago's SDK

	:type data: MercadoPagoResponse
	:param data: the dict returned by mercadopago's SDK

	:rtype: JSONResponse
	:returns: a Response with the same status and body of mercadopago's
	"""
	status = data.get('status', 500)
	response = data.get('response', {
		'error': 'Unexpected MercadoPago response'
	})
	return JSONResponse(
		content=response,
		status_code=status
	)