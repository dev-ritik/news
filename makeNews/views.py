from django.shortcuts import render


# Create your views here.

def index(request):
    """View function for home page of site."""

    # Generate counts of some of the main objects
    context = {
        'num_books': "1",
    }


    # Render the HTML template index.html with the data in the context variable
    return render(request, 'toi.html', context=context)
