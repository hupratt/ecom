from core.models import Livre, ImageLivre
import os
import requests
import urllib
import sqlite3
from django.core.files import File
from sqlite3 import Error
import datetime
import pytz

"""
improvements:
crawl aws for pics
get description, language, author from isbn

"""


def get_image(image_dir, isbn):
    isbn_path = os.path.join(image_dir, isbn)
    isdir = os.path.isdir(isbn_path)
    if isdir is True:
        _file = [i for i in os.listdir(isbn_path)]
        if len(_file) > 0 and os.path.isfile(os.path.join(isbn_path, _file[0])):
            return File(open(os.path.join(isbn_path, _file[0]), "rb"), name=_file[0])
        # print("isbn not found ", isbn)
    return False


def check_isbn_exists(isbn):
    try:
        return Livre.objects.get(isbn=isbn)
    except Livre.DoesNotExist:
        return False


def format_timezoneaware(liste):
    output = list()
    timezone = pytz.timezone("Europe/Luxembourg")
    for i, date_str in enumerate(liste):
        if len(date_str) == 10:
            date_time_obj = datetime.datetime.strptime(date_str, "%d/%m/%Y")
            output.append(timezone.localize(date_time_obj))
        else:
            output.append(timezone.localize(datetime.datetime.now()))
    return output


def create_product(
    pk,
    titre,
    isbn,
    date_publication,
    prix,
    date_achat,
    date_lecture,
    date_entree,
    note,
    nb_pages,
    date_maj,
    auteur_nom,
    langue_nom,
    genre_nom,
):
    book_instance = check_isbn_exists(isbn)
    if isinstance(book_instance, Livre):
        print("upating existing")
        quantite = book_instance.quantite
        quantite += 1
        book_instance.quantite = quantite
        book_instance.save()
    else:
        print("creating new item")
        try:
            int(note)
        except ValueError:
            note = 0
        try:
            int(nb_pages)
        except ValueError:
            nb_pages = 0
        try:
            float(prix)
        except ValueError:
            prix = 0
        date_publication, date_achat, date_lecture, date_maj, date_entree = format_timezoneaware(
            [date_publication, date_achat, date_lecture, date_maj, date_entree]
        )
        obj, created = Livre.objects.update_or_create(
            pk=pk,
            quantite=1,
            titre=titre,
            isbn=isbn,
            date_publication=date_publication,
            prix=prix,
            date_achat=date_achat,
            date_lecture=date_lecture,
            date_entree=date_entree,
            note=note,
            nb_pages=nb_pages,
            date_maj=date_maj,
            auteur_nom=auteur_nom,
            langue_nom=langue_nom,
            genre_nom=genre_nom,
        )
        img = get_image(image_dir=PLACHOLDERS, isbn=isbn)
        print(img, "img found")
        if isinstance(img, File):
            livre_image = ImageLivre(livre=obj, image=img)
            print("image created", PLACHOLDERS)
        else:
            livre_image = ImageLivre(livre=obj, image="not_found.png")
        livre_image.save()


def create_connection(db_file):
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)
    return None


def import_books_into_postgres(conn):
    cur = conn.cursor()
    cur.execute(
        "SELECT id_genre, id_auteur, id_langue, titre, isbn, date_publication, prix, date_achat, date_lecture, date_entree, note, nb_pages, date_maj FROM livre"
    )
    cur.execute(
        "SELECT livre.titre, livre.isbn, livre.date_publication, livre.prix, livre.date_achat, livre.date_lecture, livre.date_entree, livre.note, livre.nb_pages, livre.date_maj, auteur.nom, langue.nom, genre.nom FROM livre LEFT JOIN langue on livre.id_langue= langue.rowid LEFT JOIN auteur on livre.id_auteur= auteur.rowid LEFT JOIN genre on livre.id_genre= genre.rowid;"
    )
    rows = cur.fetchall()
    # rows = cur.fetchall()
    for counter, row in enumerate(rows):
        titre, isbn, date_publication, prix, date_achat, date_lecture, date_entree, note, nb_pages, date_maj, auteur_nom, langue_nom, genre_nom = (
            row
        )
        prix = str(prix) + "0"
        prix = prix.replace(",", ".")
        image_name = str(isbn) + ".jpg"
        titre = titre[:50]
        pk = counter + 1
        create_product(
            pk=pk,
            titre=titre,
            isbn=isbn,
            date_publication=date_publication,
            prix=prix,
            date_achat=date_achat,
            date_lecture=date_lecture,
            date_entree=date_entree,
            note=note,
            nb_pages=nb_pages,
            date_maj=date_maj,
            auteur_nom=auteur_nom,
            langue_nom=langue_nom,
            genre_nom=genre_nom,
        )


PLACHOLDERS = "/home/ubuntu/Dev/ecom/ecom/frontend/static/thumbnails"
DATABASE = "/home/ubuntu/Dropbox/sauvegardes/LPP-Master_2019_2020-01-21.db"
# create a database connection
conn = create_connection(DATABASE)
conn.text_factory = lambda x: str(x, "latin1")
with conn:
    import_books_into_postgres(conn)
    Livre.objects.all()
