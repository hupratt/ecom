# Generated by Django 2.2 on 2020-03-22 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_remove_orderitem_item'),
    ]

    operations = [
        migrations.CreateModel(
            name='Auteur',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='livre',
            name='prix_barre',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='ImageAuteur',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(blank=True, help_text='(optional) room image field', null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='(automatic) created date')),
                ('alt', models.CharField(default='blank', help_text='(required) SEO for images in order to provide accessibility for the visually impaired', max_length=120)),
                ('auteur', models.ForeignKey(help_text='(automatic) room model linkage', on_delete=django.db.models.deletion.CASCADE, related_name='room_image', to='core.Auteur')),
            ],
        ),
        migrations.AddField(
            model_name='auteur',
            name='livre',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.Livre'),
        ),
    ]