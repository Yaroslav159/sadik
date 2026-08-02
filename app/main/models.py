from django.db import models
from django.utils import timezone

class MenuPhoto(models.Model):
    day_number = models.PositiveSmallIntegerField(
        unique=True,
        choices=[(i, f'День {i}') for i in range(1, 11)],
        verbose_name='Номер дня в цикле'
    )
    image = models.ImageField(
        upload_to='menu/',
        verbose_name='Фото меню'
    )
    description = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Описание (необязательно)'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['day_number']
        verbose_name = 'Фото меню'
        verbose_name_plural = 'Фото меню (10 дней)'

    def __str__(self):
        return f'День {self.day_number}'