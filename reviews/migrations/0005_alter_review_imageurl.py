# Generated by Django 4.1.1 on 2022-09-14 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0004_review_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='ImageUrl',
            field=models.CharField(default=None, max_length=200),
        ),
    ]