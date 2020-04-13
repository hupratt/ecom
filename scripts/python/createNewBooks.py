
isbn=['9782367321400',
'9782847431407',
'9782847431063',
'9782367321226',
'9781521470879',
'9781717984692',
'9782367320779',
'9782367321271',
'9782367321257',
'9782864246640',
'9782020348966',
'9781849049979',
'9782367320823',
'9782367321462',
'9782915540024',
'9782367321608',
'9782367321127',
'9781847247940',
'5601072406254',
'9782868696250',
'9782367321363',
'9782367821951',
'9782267019551',
'9782743639341',
'9782367321707',
'9782906462168',
'9782906462342',
'9782906462359',
'9782906462335',
'5601072496293',
'9782367320694',
'9782367321882',
'9782738116666',
'9782729116484',
'9782367321165',
'9782266272926',
'9782266254298',
'9782266245487',
'9782020368049',
'9782757845486',
'9781784871789',
'9782367321561',
'9782367321752',
'9782367320670',
'9782296047334',
'9782296052512',
'9782343140858',
'9782343024608',
'9782367321233',
'9782367320861',
'9782915540178',
'9782847432091',
'9782264045812',
'9782367321653',
'9782367321530',
'9782260029205',
'9781447299844',
'9782367321844',
'9782367321332',
'9782070302390']


from google_images_download import google_images_download 
from sqlite3 import Error
import sqlite3
import os
import boto3
import uuid
from botocore.exceptions import NoCredentialsError
import botocore
import pathlib



def lower_quality_images(directory) -> str:
    to_download = list()
    _directory = [i for i in os.listdir(directory)]
    for element in _directory:
        if os.path.isdir(os.path.join(directory, element)):
            os.chdir(os.path.join(directory, element))
            _file = [i for i in os.listdir(os.path.curdir)]
            os.chdir(directory)
            if len(_file) == 0:
                to_download.append(element)
    return ",".join(to_download)




def google_it(placeholders):
    google = google_images_download.googleimagesdownload()

    # main download
    arguments = {"keywords": str(",".join(isbn)), "limit": 1, "print_urls": True
                 , "output_directory": placeholders}  # creating list of arguments
    paths, _ = google.download(arguments)

    # leftovers
    to_download = lower_quality_images(placeholders)
    arguments = {"keywords": str(to_download), "limit": 1, "print_urls": True,
                 "output_directory": placeholders}  # creating list of arguments
    paths, _ = google.download(arguments)


def rename(placeholders):
    _dir = [i for i in os.listdir(placeholders) if os.path.isdir(
        os.path.join(placeholders, i))]
    for isbn in _dir:
        img = [i for i in os.listdir(os.path.join(placeholders, isbn))]
        if len(img) > 0:
            filename, file_extension = os.path.splitext(img[0])
            if file_extension not in [".jpg", ".gif", ".png", ".bmp", ".svg", ".webp", ".ico"]:
                filename = img[0]
                file_extension = filename[-4:]
            try:
                os.rename(os.path.join(placeholders, isbn, filename + file_extension),
                          os.path.join(placeholders, isbn, isbn + file_extension))
            except FileNotFoundError:
                pass


def main():
    PLACHOLDERS = "/home/ubuntu/Dev/ecom/ecom/frontend/static/thumbnails"
    google_it(PLACHOLDERS)
    rename(PLACHOLDERS)



if __name__ == "__main__":
    main()
