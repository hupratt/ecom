
SELECT isbn, count(*)
FROM public.core_livre
GROUP BY
  isbn
HAVING count(*) > 1;
