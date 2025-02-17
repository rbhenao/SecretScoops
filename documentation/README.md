# Secret Scoops AWS Architecture & Security

## Architecture Summary
Secret Scoops is deployed with a **multi-account AWS architecture** ensuring **isolation** and **security** and uses GitHub with GitActions for a **secure and scalable CI/CD pipeline** across **DEV, UAT, and PROD** environments.

### **Multi-Account AWS Setup**
- **Root Account**: Centralized Security Hub, Configuration, IAM, and Log Management
- **DEV Account**: Fewer Restrictions For Development and Testing
- **UAT Account**: Pre-production, Stricter Controls, Used By Ops
- **PROD Account**: Highly-Secure, Highly Available, Fault Tolerant, Production Environment

### **CI/CD Pipeline (GitHub Actions → AWS)**
- **DEV**: Auto-deploys for testing
- **UAT**: Auto-deploy after passing extensive suite of tests. Used for pre-production testing.
- **PROD**: Manual approval, immutable deployments

### **Deployment Infrastructure**
- **DNS**: Route53
- **Frontend**: S3 + CloudFront
- **Backend**: API Gateway + Private VPC + Load Balancer + EC2 Instances
- **Database**: RDS PostgreSQL (Multi-AZ, Encrypted, Auto-Backups)
- **Workers**: SQS for Queues and SNS for notifications

---

## 🔒 Security
### **Access Control**
- **IAM**: Central identity management
- **Service Control Policies (SCPs)**: applied per environment acacount (OU)
- **Parameter Store** for DEV/UAT
- **Secrets Manager** for PROD (Automatic Rotation, Encryption)

### **Infrastructure Security**
- **No SSH access**: Immutable Instances (terminate & redeploy)
- **VPC Isolation**: Private subnets for sensitive resources
- **S3 Encryption**: No public buckets, IAM-restricted access, Principle of least privilege 
- **Auto Scaling & Self-Healing**

### **️Application & API Security**
- **API Gateway + AWS WAF**: Protection from SQL injection, DDoS, bots
- **JWT Authentication**: Secure API access
- **Logging**: detect anomalies

### **Monitoring & Compliance**
- **Amazon Macie**: Scan All Bucket for HIPAA compliance. Detect PHI
- **AWS CloudTrail**: Log all API activity (store in centralized S3, retained for compliance)
- **AWS Config**: Enforce security rules (e.g., "S3 must not be public")
- **Security Hub**: Monitors and alerts on suspicious activity
- **SNS Alerts**: Immediate notification on security incidents
---

## Best Practices
- **Immutable Infrastructure** : No live hot-fixes, redeploy on failure  
- **Principle Of Least Privilege**: Well defined IAM roles, permissions and access patterns  
- **Multi-Layered Security** : IAM, VPC, WAF, Encryption, Monitoring, Amazon Macie  
- **Automated Compliance** : AWS Config, Security Hub  
- **Private Networking** : Only necessary ports open, no public access, use VPNs
