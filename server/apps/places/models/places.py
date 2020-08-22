import datetime

from django.contrib.auth.models import User
from django.db import models
from yandex_geocoder import Client

from config.settings import GEOCODER_KEY

client = Client(GEOCODER_KEY)


class Place(models.Model):
    name = models.CharField(max_length=30)
    image = models.ImageField(upload_to='upload', blank=True)
    from_hour = models.TimeField(default=datetime.time(0, 0))
    to_hour = models.TimeField(default=datetime.time(0, 0))
    address = models.CharField(max_length=100)
    average_price = models.PositiveSmallIntegerField(default=0)
    longitude_deg = models.CharField(max_length=30, blank=True)
    latitude_deg = models.CharField(max_length=30, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Заведение'
        verbose_name_plural = 'Заведения'
        ordering = ('id',)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        coordinates = client.coordinates(self.address)
        self.longitude_deg = coordinates[0]
        self.latitude_deg = coordinates[1]
        super(Place, self).save(*args, **kwargs)
