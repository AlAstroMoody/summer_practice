from django.contrib import admin

from apps.places.models import Place


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'image', 'from_hour', 'to_hour',
                    'address', 'average_price', 'longitude_deg', 'latitude_deg', 'owner')
