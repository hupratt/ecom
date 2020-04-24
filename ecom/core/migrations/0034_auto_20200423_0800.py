# Generated by Django 2.2 on 2020-04-23 06:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0033_auto_20200419_0929'),
    ]

    operations = [
        migrations.AddField(
            model_name='livre',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, help_text='(automatic) created date'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='livreitem',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, help_text='(automatic) created date'),
            preserve_default=False,
        ),
    ]