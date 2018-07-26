FROM gpdowning/python

WORKDIR /mibrary
COPY . .

RUN pip install flask
RUN pip install flask_cors
RUN pip install flask_sqlalchemy
RUN pip install flask_marshmallow
RUN pip install PyLD

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g mocha

EXPOSE 5000

CMD [ "python", "src/app.py" ]