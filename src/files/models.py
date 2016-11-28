from __future__ import unicode_literals

from django.db import models

from common.utils import GetUploadTo


class FileUpload(models.Model):
    created = models.DateTimeField(auto_created=True, auto_now_add=True)
    name = models.TextField()
    file = models.FileField(upload_to=GetUploadTo('file', 'files'))
    size = models.IntegerField(default=0)
    mtime = models.IntegerField(default=0)
    hash = models.CharField(max_length=128)

    class Meta:
        verbose_name = 'file'
        verbose_name_plural = 'files'
        ordering = ['-created']
