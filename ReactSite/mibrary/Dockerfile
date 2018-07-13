FROM gpdowning/python

WORKDIR /mibrary
COPY . .

RUN pip install flask
RUN pip install flask_cors
RUN pip install flask_sqlalchemy
RUN pip install flask_marshmallow
RUN pip install PyLD

EXPOSE 5000

CMD [ "python", "src/app.py" ]