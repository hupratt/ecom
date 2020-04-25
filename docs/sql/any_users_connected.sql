select numbackends as number_active_users
from pg_stat_database 
WHERE numbackends>0 AND datname='ecom';