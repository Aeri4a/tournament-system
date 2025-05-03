# Online tournament system

## Features

- select discipline
- users -> students/organizers
- accounts with email confirmation link
- login + forgot password
- React + NestJS - TS !! mono repo + common

## Additional

- Delete need modal to confirm
- Concurent data access - limit users and applying for tournament (probably transactions)

## Views

### First Page - Tournament page UPCOMING

Upcoming tournaments with paging (10 per page) and search mechanism.
To see tournaments we don't need to be logged in.

### After click in tournament

Details page

- name
- discipline
- organizer
- time
- google maps with location
- max participants
- deadline to apply
- sponsor logos
- number or ranked players
- users should log in and then can have option to apply to tournament
- organizer can edit those informations

### Tournament in progress

What happens after deadline is gone

- System is creating a tournament ladder
- Users can see the ladder
- Users can add results, both users need to enter the same results or will be error
- Scoreboard visualisation to choose

## Routes

- '/' - tournaments view
- '/login'
- '/forgot-password'
- '/register'
- '/account-activation'
- '/tournament/{id}' - specific tournament

## To Do - for now

- [x] Initialize project
- [x] Setup for UI state management
- [x] React router - Tanstack router
- [x] Backend: TypeORM, postgres & migrations
- [] Backend: Session for auth
- [] Email notifications
- [] Initialize views & startup db models
- [] Apply user authentication on backend
- [] Apply user authentication on frontend
- [] Backend: add cron for tournament start
- [] Think about ladder organization (??)
