SELECT  *
FROM    public.core_livre
WHERE   id NOT IN (SELECT livre_id FROM public.core_imagelivre)