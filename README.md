# Online tournament system

## Features

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

## To Do

- [x] Initialize project
- [x] Setup for UI state management
- [x] React router - Tanstack router
- [x] Backend: TypeORM, postgres & migrations
- [x] Backend: Session for auth
- [x] Email notifications
- [x] Apply user authentication on backend
- [x] Apply user authentication on frontend
- [x] Initialize views & startup db models

Must

- [x] Details view
- [x] Create tournament modal
- [] Edit tournament modal
- [] Apply for tournament handle
- [] Google maps in details
- [] Add toasts
- [] Backend: add cron for tournament start
- [] Think about ladder organization (??)
- [] Account manage views (before login) - register & password reset & activation

Additional or not important

- [] Handle not found in details
- [] Fix scrolling inside in views
- [] Themes fix complete
- [] Returned dto (mainly user)
- [] Handle isLoading in details with blanks from chakra ui
