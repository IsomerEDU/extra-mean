#!/bin/sh

#script to create a new self-signed certificate
#generates cert files good for 365 days

#based on http://www.akadia.com/services/ssh_test_certificate.html
#<a href="http://www.akadia.com/services/ssh_test_certificate.html"></a>

#run this in the directory that you want the certs created in

# server.crt is the certificate
# server.key is the key

openssl genrsa -des3 -out server.key 1024
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
