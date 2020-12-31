# Information on Cloudformation

This directory contains the necessary files to build this project using cloudformation. Note however that this is likely to leave this project in future.

For example, this lambda requires access to an S3 bucket to store its data. Great. But that bucket is not currently set up using Cloudformation. That still needs to be done, but doesn't make sense to do in this repo, as it will be utilised by many projects in future.

In essence, infra sits above local project concerns, and so likely needs to be extracted. We'll get there.

## Items that need formalising in Cloudformation

- S3 Bucket (personal-data-lake-ivan)
- Website (its whole own thing)
- Cloudwatch events to auto-trigger this fella (reasonably could be located here).
- Deployment Pipeline for this lambda (still needs to be created)
  - Steps:
    - `docker build -t whoop-query-lambda .`
    - `docker tag whoop-query-lambda:latest <ACCN_ID>.dkr.ecr.<REGION>.amazonaws.com/whoop-query-lambda:latest`
    - `aws ecr get-login-password | docker login --username AWS --password-stdin <ACCN_IN>.dkr.ecr.<REGION>.amazonaws.com`
    - `docker push <ACCN_ID>.dkr.ecr.<REGION>.amazonaws.com/whoop-query-lambda:latest`

