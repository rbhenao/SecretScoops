# Secret Scoops AWS Architecture & Security Overview

## Overview
Secret Scoops is deployed using a **multi-account AWS architecture** with a **secure, scalable CI/CD pipeline**. ensures **isolation**, **security**, and **automation** across **DEV, UAT, and PROD** environments.

---

## Architecture Summary
### **Multi-Account AWS Setup**
- **Root Account** → Centralized security & compliance management
- **DEV Account** → Flexible for development & testing
- **UAT Account** → Pre-production testing with stricter controls
- **PROD Account** → Secure, high-availability production environment

### **CI/CD Pipeline (GitHub Actions → AWS)**
- **DEV** → Auto-deploys for testing
- **UAT** → Manual approval required for pre-production testing
- **PROD** → Manual approval, immutable deployments

### **Deployment Infrastructure**
- **Backend** → AWS Lambda / ECS Fargate (Auto-Scaling, Zero-Downtime Deployments)
- **Frontend** → S3 + CloudFront (Global CDN)
- **Database** → RDS PostgreSQL (Multi-AZ, Encrypted, Auto-Backups)
- **Messaging** → SNS / SQS for asynchronous communication

---

## 🔒 Security Strategy
### **️Access Control**
- **IAM & AWS SSO** → Centralized identity management, no direct IAM users
- **Service Control Policies (SCPs)** → Prevents destructive actions (e.g., RDS deletion)
- **Secrets Management** →
- **Parameter Store** for DEV/UAT
- **Secrets Manager** for PROD (Automatic Rotation, Encryption)

### **Infrastructure Security**
- **No SSH access** → Instances are immutable (kill & redeploy)
- **Auto Scaling & Self-Healing** → Ensures high availability
- **VPC Isolation** → Private subnets for sensitive resources, public subnets for frontend/API Gateway
- **S3 Encryption & Least Privilege** → No public buckets, IAM-restricted access

### **️Application & API Security**
- **API Gateway + AWS WAF** → Protects against SQL injection, bot traffic, DDoS
- **JWT Authentication** → Secure API access
- **Rate Limiting & Logging** → Prevent abuse, detect anomalies

### **Monitoring & Compliance**
- **AWS CloudTrail** → Logs all API activity (stored in centralized S3, retained for compliance)
- **AWS Config** → Enforces security rules (e.g., "S3 must not be public")
- **Security Hub** → Monitors and alerts on suspicious activity
- **SNS Alerts** → Immediate notification on security incidents

---

## Best Practices Summary
- **Immutable Infrastructure** → No manual changes, redeploy on failure  
- **Least Privilege Access** → DevOps assumes roles, no persistent IAM users  
- **Multi-Layered Security** → IAM, VPC, WAF, Encryption, Monitoring  
- **Automated Compliance Enforcement** → AWS Config, GuardDuty, Security Hub  
- **Zero-Trust Networking** → Only necessary ports open, no public DB access  