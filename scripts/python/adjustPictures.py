
from core.models import Livre, ImageLivre, LivreItem
import os, time
import requests
from django.core.files import File
import datetime
import pytz
import django.utils.encoding


def grab_media(placeholders):
    return [(os.path.join(placeholders, i),i) for i in os.listdir(placeholders) if os.path.isfile(os.path.join(placeholders, i))]

def check_isbn_exists(isbn):
    try:
        return Livre.objects.get(isbn=isbn)
    except Livre.DoesNotExist:
        return False


def update_product(picture):
    picture_path, filename = picture
    isbn, file_extension = os.path.splitext(filename)
    book_instance = check_isbn_exists(isbn)
    if isinstance(book_instance, Livre):
        try:
            time.sleep(1)
            file_instance = File(open(picture_path,'rb'),name=filename)
            image_instance = ImageLivre(livre=book_instance, image=file_instance,alt=f'Book import image for isbn: {isbn}')
            image_instance.save()
        except Exception as e:
            print(e)
    else:
        print(f'{isbn} could not be found on the db')


def update_books_into_postgres():
    MEDIA = '/home/ubuntu/Dev/ecom/media'
    pictures_list = grab_media(MEDIA)
    for picture in pictures_list:
        update_product(picture)


update_books_into_postgres()

'''
check for dups
check for null values in isbn
migrate to the new model of isbns
delete existing images
'''