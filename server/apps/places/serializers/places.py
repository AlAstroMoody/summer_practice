from rest_framework.serializers import ModelSerializer

from apps.places.models import Place


class PlaceSerializer(ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'name', 'image', 'from_hour', 'to_hour',
                  'address', 'average_price', 'longitude_deg', 'latitude_deg', 'owner')
        extra_kwargs = {'longitude_deg': {'read_only': True},
                        'latitude_deg': {'read_only': True},
                        'average_price': {'required': False, 'read_only': True},
                        'owner': {'read_only': True}}

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        instance = super().create(validated_data)
        return instance
