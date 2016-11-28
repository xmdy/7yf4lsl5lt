# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-28 08:25
from __future__ import unicode_literals

import common.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_created=True)),
                ('name', models.TextField()),
                ('file', models.FileField(upload_to=common.utils.GetUploadTo('file', 'files'))),
                ('size', models.IntegerField(default=0)),
                ('mtime', models.IntegerField(default=0)),
                ('hash', models.CharField(max_length=128)),
            ],
            options={
                'ordering': ['-created'],
                'verbose_name': 'file',
                'verbose_name_plural': 'files',
            },
        ),
    ]