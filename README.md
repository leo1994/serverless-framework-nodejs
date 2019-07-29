# Serverless Framework - ⬢ NodeJS v10.16

## Summary

  - [Summary](#summary)
  - [Overview](#overview)
  - [Requirements](#requirements)
  - [Usage](#usage)
  - [TODO](#todo)

## Overview

The idea is just to create a simple way to save and read logs using serverless framework with SQS, Lambda, DynamoDB.

## Requirements

- NodeJS v10.x.x
- NPM v6.x.x
- Serverless Framework CLI `npm install -g serverless`

## Usage

Just run `serverless deploy` or `sls deploy`, this will generate all resources (DynamoDB, SQS, routes and permissions).

> AWS credentials must be. Run `aws config crendentials` to configue

## TODO

- [ ] Resolve concurrency
- [ ] Improve erro handling 
- [ ] Change route name
