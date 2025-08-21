FROM rust:1.87-bookworm AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y pkg-config libssl-dev

# Copy the Cargo.toml and Cargo.lock files to the container
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo 'fn main() {}' > src/main.rs

# Build the dependencies
RUN cargo build --release

# copy and build the actual project
COPY ./src ./src
RUN touch src/main.rs && cargo build --release --locked

# Runtime image
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/target/release/api .
COPY Rocket.toml ./

EXPOSE 8000

CMD ["./api"]