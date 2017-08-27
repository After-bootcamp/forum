drop table if exists users cascade;
drop table if extsts followed_users cascade;
drop table if extsts followed_threads cascade;
drop table if extsts followed_threads cascade;
drop table if extsts forums cascade;
drop table if extsts threads cascade;
drop table if extsts posts cascade;

create table users(
  id serial primary key unique,
  email text not null,
  password_hash text
);

create table followed_users(
  follower integer references users,
  following integer references users,
  primary key(follower,following)
);

create table followed_threads(
  follower integer references users,
  following integer references threads,
  primary key(follower,following)
);

create table followed_forums(
  follower integer references users,
  following integer references forums,
  primary key(follower,following)
);

create table forums(
  id serial primary key unique,
  title text,
  created_at timestamp default current_timestamp,
  parent integer references forums
);

create table threads(
  id serial primary key unique,
  title text,
  created_at timestamp default current_timestamp,
  parent integer references forums
);

create table posts(
  id serial primary key unique,
  poster integer references users,
  parent integer references threads,
  created_at timestamp default current_timestamp,
  updated_at timestamp
);
