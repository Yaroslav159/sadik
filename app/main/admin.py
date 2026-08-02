from django.contrib import admin
from .models import MenuPhoto

@admin.register(MenuPhoto)
class MenuPhotoAdmin(admin.ModelAdmin):
    list_display = ['day_number', 'image', 'uploaded_at']
    ordering = ['day_number']