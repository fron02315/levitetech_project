# Generated by Django 4.0.2 on 2022-05-14 20:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='flag',
            field=models.BooleanField(default=False),
        ),
    ]