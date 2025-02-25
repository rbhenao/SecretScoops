# SecretScoops
High security ice cream delivery - by Don Gelato

## Overview
SecretScoops is a full-stack application that consists of:
- **Frontend** (React + Vite)
- **API** (Express + PostgreSQL)
- **Database** (PostgreSQL)
- **Workers** (Node.js processing service)
- **SQS Queue** (ElasticMQ for local development)

This guide will walk you through setting up and running the entire system using Docker.

---

## 📂 **1. Setting Up the Environment File (`.env`)**
To configure the project, you need to create a **`.env` file** in the project root.

Run the following command to create the file:
```sh
cp .env.example .env
```

## **2. Next open and edit the .env file and update enviornment variables.
(For testing purposes default values can be used)

## **3. Build & Run with Docker
```sh
docker-compose up --build
```

## **4. Access Services (defaults)
- **Frontend: http://localhost:5173**
- **Api: http://localhost:4000**
- **DB: Port 5432**
- **SQS UI: http://localhost:9325**
