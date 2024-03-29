from datetime import datetime

from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


class NewNewsForm(forms.Form):
    # news_time = forms.DateTimeField(help_text="Enter a date before today.")
    news_content = forms.CharField(widget=forms.Textarea, help_text='Enter news content here')
    headline = forms.CharField(max_length=200, help_text='Enter a headline')
    highlight1 = forms.CharField(max_length=200, help_text='Enter highlight1')
    highlight2 = forms.CharField(max_length=200, help_text='Enter highlight2')
    place = forms.CharField(max_length=80, help_text='Enter the place')
    author = forms.CharField(max_length=50, help_text='Enter the author')
    link = forms.CharField(max_length=200, help_text='Enter a link')
    imageUrl = forms.URLField(help_text='Enter a image url')
    imageCaption = forms.CharField(max_length=100, help_text='Enter a image caption')

    print("NewNewsForm")

    def clean_news_time(self):
        data = self.cleaned_data['news_time']
        # print("clean_news_time")
        #
        # Check if a date is not in the past.
        # if data > datetime.now():
        #     raise ValidationError(_('Invalid date - renewal in future'))

        # Remember to always return the cleaned data.
        return data
