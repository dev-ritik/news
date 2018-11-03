from datetime import datetime

from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


class NewNewsForm(forms.Form):
    news_time = forms.DateTimeField(help_text="Enter a date between now and 4 weeks (default 3).")

    def clean_news_time(self):
        data = self.cleaned_data['news_time']

        # Check if a date is not in the past.
        if data > datetime.now():
            raise ValidationError(_('Invalid date - renewal in future'))

        # Remember to always return the cleaned data.
        return data