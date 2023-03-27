-- Remove tables
drop table if exists account_roles;
drop table if exists roles;

-- Create roles table
create table if not exists roles (
  role_id serial primary key,
  role_name varchar(50) unique not null
);

-- add row level security
alter table roles
  enable row level security;

-- create basic user and admin roles
insert into roles (role_name) values
  ('users'),
  ('admin');

-- create the account_roles table
create table if not exists account_roles (
  user_id uuid not null,
  role_id int not null,
  grant_date timestamp default now(),
  primary key (user_id, role_id),
  foreign key (role_id)
    references roles (role_id),
  foreign key (user_id)
    references auth.users (id)
);

-- add row level security
alter table account_roles
  enable row level security;
