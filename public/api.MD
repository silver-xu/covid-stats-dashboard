# COVIDStats GraphQL API

## What is it

`COVIDStats GraphQL API` is the data engine behind this site. It harvests COVID19 infection data from `John Hopkins` medical school on 11AM Australian Eastern Time every day. The data is then processed into a structured Query format for the client to consume.

## GraphQL

`GraphQL` is an API standard (just like REST) created by Facebook to query nested data. The World we are living in, Countries, States are all nested which makes `GraphQL` the "GOTO" technology to query the infection data.

Here is an sample GraphQL to run on COVIDStats GraphQL:

```
query global{
  global{
    totalConfirmedCases
    newlyConfirmedCases
    Australia {
        totalConfirmedCases
        newlyConfirmedCases
        Victoria{
            totalConfirmedCases
            newlyConfirmedCases
        }
    }
  }
}
```

The above query fetches the `totalConfirmedCases` and `newlyConfirmedCases` for World Stats, Australia Stats as well as Victoria Stats.

Here is the example response:

```
{
    "data": {
        "global": {
            "totalConfirmedCases": 1511104,
            "newlyConfirmedCases": 85008,
            "Australia": {
                "totalConfirmedCases": 6010,
                "newlyConfirmedCases": 115,
                "Victoria": {
                    "totalConfirmedCases": 1212,
                    "newlyConfirmedCases": 21
                }
            }
        }
    }
}
```

Full API documentation can be found at [here](http://docs.covidstats.com.au).

## Free API

In order to encourage developer's creativities during the pandemic, there is `no charge`, `no rate limiting`, and `CORS enabled` to the COVIDStats GraphQL API, although fair usage is enforced strictly, and rate limiting may be introduced at `COVIDStats' discretion` in the future.

As an one man development team, I wish everyone treats as they would have to pay for the API and cache the results on client side as much as possible.

## Help me help you

Unfortunately the developer of COVIDStats API is about to be layed-off by his current employer due to the economic downturn. If anyone knows about any position openings, please feel free to pass on my (LinkedIn Profile)[https://linkedin.com/in/silverxu].

Tech-stacks I specialise in:

- NodeJs
- .Net Core
- ReactJS
- GraphQL
- RDS, NoSQL
- AWS
