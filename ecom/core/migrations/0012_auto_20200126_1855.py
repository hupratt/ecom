# Generated by Django 2.2.9 on 2020-01-26 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_imagelivre'),
    ]

    operations = [
        migrations.RenameField(
            model_name='imagelivre',
            old_name='location',
            new_name='livre',
        ),
    ]
