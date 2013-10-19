The Kino App
============

The Kino app is a so-fucking-beautiful-you-want-to-lick-it app to display movie screenings in Berlin. However, nothing's stopping us to expand to different cities.

### Use cases
We're aiming to cover the following use cases:
  * Find nearest movies (display movies ordered by geographical distance)
  * Find soonest movies (display movies ordered by earliest screening time)
  * Find movies screenings (display available movies and their screening time & location)
  * Making Josh happy

### JSON structure
API server the available data in JSON format in the following structure:
```json
{"movies": [{"title": "Forrest Gump",
             "date": "2010-01-01T19:30:00+0200",
             "cinema": "Acud Kino"}
            }, ...]
           ...],

 "cinemas": [{"name": "Acud Kino",
              "ll": "52.53353,13.40086"},
            ...]
}
```
This structure is based on one [night of heavy drinking and listening to psychedelic music at Lautaro's](doc/images/2013-09-25-use_cases_and_json_format.jpg). Most fields should be self-descriptive. The `date` field is formatted in [RFC 3339](http://tools.ietf.org/html/rfc3339) format. The `ll` field is a comma-delimited string of the latitude and longitude values of the cinema.
