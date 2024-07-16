#!/bin/bash

function program_is_installed {
  local return_=1

  type $1 >/dev/null 2>&1 || { local return_=0; }
  echo "$return_"
}

# Install CodeDeploy agent
sudo yum update -y
cd /home/ec2-user

if [ $(program_is_installed docker) == 0 ]; then
  # sudo amazon-linux-extras install docker -y: this command is for amazon linux 2
  sudo yum install docker -y
  sudo systemctl start docker
  sudo chmod 666 /var/run/docker.sock # add execution permission

  # install docker-compose
  sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m) -o /usr/bin/docker-compose && sudo chmod 755 /usr/bin/docker-compose && docker-compose --version.
fi

  # sudo curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
  # sudo yum install -y nodejs

# rsync -ravz -e "ssh -i socialAppKeyPair.pem" ./frontend/build  ec2-user@54.251.8.31:/home/ec2-user/
rsync -ravz -e "ssh -i socialAppKeyPair.pem" ./frontend/build  ec2-user@54.251.8.31:/home/ec2-user/
# rsync -ravz -e "ssh -i key.pem" --exclude='*/.git' ./frontend/build  ec2-user@54.251.8.31:/home/ec2-user/

rsync -ravz -e "ssh -i key.pem" --exclude='*/.git' ./backend  ec2-user@10.0.1.130:/home/ec2-user/

# curl -X POST http://10.0.1.130:6969/api/v1/signin \
# -H "Content-Type: application/json" \
# -d '{"email": "dongminhquan2004@gmail.com", "password": "quan0401"}'
