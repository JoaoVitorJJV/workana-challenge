PGDMP         -                {            softexpert_challenge    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    softexpert_challenge    DATABASE     �   CREATE DATABASE softexpert_challenge WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
 $   DROP DATABASE softexpert_challenge;
                postgres    false            �            1259    16399    id    SEQUENCE     k   CREATE SEQUENCE public.id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.id;
       public          postgres    false            �            1259    16400    products    TABLE     p  CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    supplier character varying(255) NOT NULL,
    batch character varying(255),
    price numeric(10,2) NOT NULL,
    product_type_id integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16405    products_id_seq    SEQUENCE     �   ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    16406    products_type    TABLE     �   CREATE TABLE public.products_type (
    id integer NOT NULL,
    tax numeric(10,2) NOT NULL,
    name character varying(255)
);
 !   DROP TABLE public.products_type;
       public         heap    postgres    false            �            1259    16409    products_type_id_seq    SEQUENCE     �   ALTER TABLE public.products_type ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16410    sales    TABLE     �   CREATE TABLE public.sales (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    price numeric(10,2) NOT NULL
);
    DROP TABLE public.sales;
       public         heap    postgres    false            �            1259    16413    sales_id_seq    SEQUENCE     �   ALTER TABLE public.sales ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    16414    users    TABLE     4  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(155) NOT NULL,
    email character varying(155) NOT NULL,
    password character varying(255),
    token character varying(255),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16419    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221                      0    16400    products 
   TABLE DATA           w   COPY public.products (id, name, supplier, batch, price, product_type_id, quantity, created_at, updated_at) FROM stdin;
    public          postgres    false    215   �                 0    16406    products_type 
   TABLE DATA           6   COPY public.products_type (id, tax, name) FROM stdin;
    public          postgres    false    217                    0    16410    sales 
   TABLE DATA           K   COPY public.sales (id, created_at, product_id, user_id, price) FROM stdin;
    public          postgres    false    219   ;                 0    16414    users 
   TABLE DATA           Y   COPY public.users (id, name, email, password, token, created_at, updated_at) FROM stdin;
    public          postgres    false    221   �                  0    0    id    SEQUENCE SET     1   SELECT pg_catalog.setval('public.id', 1, false);
          public          postgres    false    214                       0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 16, true);
          public          postgres    false    216                       0    0    products_type_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.products_type_id_seq', 6, true);
          public          postgres    false    218                       0    0    sales_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.sales_id_seq', 22, true);
          public          postgres    false    220                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    222            v           2606    16421    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    215            x           2606    16423     products_type products_type_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.products_type
    ADD CONSTRAINT products_type_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.products_type DROP CONSTRAINT products_type_pkey;
       public            postgres    false    217            z           2606    16425    sales sales_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_pkey;
       public            postgres    false    219            |           2606    16427    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221               q   x�3����QpJM,)�t�MJ-���423��35�4�4�4202�50�54W00�2��2��&�k`�eh�����阗�W��_Z2�P��h�1B���P����61�A1z\\\ ��!6            x�3�4�32�I-.����� t^         }   x����� ��g�
��"h-�_�)Ʌ˅�F޾���EPN8�
\�,|�0��}�}.>>W��ϧ�D�<Ǡ����k�y���x�����_�/Z��6T��Ań��O�lb4P0�73� S�v         �   x�mλr�@��zy
Z��a�V3��\Ftlv�Ł��Iy%/���H�4_�W?%K�yӤ�\_��vd8����,�{b�hR0u�}R��˶ۤ���5����<�S&��a�E�tw���ih�鉧�� ArZ)��+�«*�$�L��RwBÈ9 ٽ��o?ξ�;C3�)�UQ��5y>�]X�✻�?��b/�8k�����-��u���A��A�s��Ȩ/QbX��
����&��C#��5cg����X�     