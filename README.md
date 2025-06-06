# Proyek SBD

## Anggota
Yehezkiel Jonatan - 2006520235 (Frontend Developer)
Muhammad Hafiz Widyawan - 2006468762 (Backend Developer)
Darmawan Hanif - 2206829175 (Backend Developer)
Nahl Syareza Rahidra - 2206830340 (Frontend Developer + Integration)

## Deskripsi

Kami membuat proyek game sederhana yang diimplementasikan menggunakan JavaScript. Game kami terbagi menjadi bagian, yaitu backend dan frontend. Backend di sini berfungsi untuk menghubungi frontend dengan database.

## Dokumentasi API

Terdapat beberapa bagian API dari backend, yaitu

### USER

API ini memiliki model User dan terhubung dengan collection users
User merupakan pengguna yang akan menggunakan game

- POST **/user/create**</br>
  API ini berfungsi untuk membuat akun baru bagi user. API ini membutuhkan data BODY name, email, dan password
- GET **/user/getAll**</br>
  API ini berfungsi untuk menampilkan semua document yang ada pada collection users.
- GET **/user/get/:id**</br>
  API ini berfungsi untuk menampilkan document yang memiliki key id yang sama dengan data params :id.
- POST **/user/login**</br>
  API ini digunakan untuk memverifikasi akun ketika user ingin masuk ke dalam game. Diperlukan data BODY berupa email dan password
- POST **/user/progressXP**</br>
  API ini digunakan untuk menambahkan Level, XP, dan attribute yang dimiliki oleh user. Ia membutuhkan data BODY user dan jumlah xp.

### ITEM

API ini memiliki model BaseItem dan terhubung dengan collection items. Dia memiliki beberapa model tambahan, misalnya Weapon, Spell, Armor, dan Potion.
Item merupakan benda yang bisa digunakan oleh User di game dengan berbagai type dan fungsionalitas.

- POST **/item/create**</br>
  API ini digunakan untuk menambahkan item baru ke dalam game. Item itu sendiri terbagi menjadi beberapa jenis, yaitu Misc, Weapon, Armor, Spell, dan Potion. Masing-masing item memiliki struktur data yang berbeda, namun setiap item memiliki data name, sprite, max_stack, dan type. Weapon memiliki data tambahan atk dan cost. Armor memiliki def. Spell memiliki mgc dan cost, dan potion memiliki data restore dan attribute. Data dimasukkan menggunakan BODY.
- GET **/item/getAll**</br>
  API ini digunakan untuk menampilkan semua jenis item yang ada pada database
- GET **/item/get/:id**</br>
  API ini membutuhkan params dan akan mengembalikan item yang spesifik. Hanya dengan menggunakan id, ia mampu memberikan data Item tersebut, apapun type-nya.
- DELETE **/item/delete/:id**</br>
  API ini berfungsi menghapus dokumen dari collection berdasarkan id.

### ENEMY

API ini memiliki model Enemy dan terhubung dengan collection enemies.
Enemy merupakan musuh yang akan dilawan oleh User.

- POST **/enemy/create**</br>
  API ini membuat document baru terhadap collection. Dibutuhkan data dalam bentuk BODY yang memiliki nilai untuk name, max_hp, level, atk, def, mgc, sprite, bg, dan biome.
- GET **/enemy/getAll**</br>
  API ini akan menampilkan semua document yang ada pada collection enemies.
- GET **/enemy/get/:id**</br>
  API ini mengembalikan document spesifik berdasarkan id yang sesuai dengan id pada params
- GET **/enemy/getLevelled?level=&biome=**</br>
  API ini digunakan untuk mendapatkan document tertentu berdasarkan rentang level dan biome spesifik. Backend ini digunakan ketika akan melakukan duel.
- DELETE **/enemy/delete/:id**</br>
  API ini menghapus document dari collection enemies yang memiliki id yang sama dengan params.

### INVENTORY

API ini memiliki model Inventory dan terhubung dengan collection inventories. Ia memiliki ref terhadap collection items dan users.
Inventory menyimpan relasi antara Item dan User. User yang berbeda dapat memiliki Item yang sama, namun dalam jumlah count yang berbeda.

- POST **/inv/add**</br>
  API ini digunakan untuk menambahkan item baru terhadap inventory user. Kita tidak bisa langsung menghubungkan user dan item karena diperlukan item count atas item tersebut, yang dilakukan oleh Inventory. Count yang diberikan juga tidak bisa melebihi batas max_stack yang dimiliki oleh item tersebut. Jika lebih, maka akan diberikan count sesuai dengan max_stack Item.

- GET **/inv/getAll**</br>
  API ini mengembalikan semua document yang ada pada collection inventories.

- GET **/inv/getAll/p**</br>
  API ini berfungsi mirip dengan API sebelumnya, namun mengembalikan document yang sudah di-populate, karena terdapat value yang disimpan berupa id dari collection lain.

- GET **/inv/get/:id**</br>
  API ini mengembalikan document spesifik yang memiliki id yang sama dengan id yang diberikan di params.

- GET **/inv/get/p/:id**</br>
  API ini mirip dengan sebelumnya, namun menggunakan fungsi populate.

- PUT **/inv/remove**</br>
  API ini berfungsi untuk menghilangkan count dari item dengan jumlah yang sudah ditentukan. Jika item memiliki nilai kurang dari 1, maka dia akan dihapus dari document. Ia menggunakan data BODY dan membutuhkan data user, item, dan count.

- DELETE **/inv/delete/:id**</br>
  API ini menghapus document sesuai id yang ada pada collection.

### LOOT

API ini memiliki model Loot dan collection loots. Dia memiliki dua tipe model yaitu enemy_loot dan merchant_loot. Ia memiliki ref berupa item.
Loot dapat digunakan sebagai reward ketika mengalahkan musuh atau dijual oleh NPC di game. Loot yang diberikan sesuai dengan ambang level yang dimiliki user

- POST **/loot/create**</br>
  API ini digunakan untuk membuat document Loot baru. Dia menggunakan BODY dan membutuhkan data type, item, dan level. Data tambahannya yaitu biome untuk enemy_loot atau merchant untuk merchant_loot

- GET **/loot/getAll**</br>
  API ini digunakan untuk melihat semua document pada collection

- GET **/loot/getLevelled/?biome=forest&level=**</br>
  API ini digunakan untuk mengambil satu buah dokumen secara random. Document yang diberikan adalah document yang memiliki level lebih rendah atau sama dengan dari level yang diinput, dalam kasus ini yaitu level user.

- GET **/loot/getLevelled/p/?biome**</br>
  API ini mirip dengan sebelumnya namun menggunakan populate pada field item.

- GET **/loot/getMerchant/:merchant**</br>
  API ini akan memberikan data berupa Loot yang memiliki value merchant yang sama dengan params.

- GET **/loot/getMerchant/:merchant**</br>
  API ini mirip dengan sebelumnya namun dengan populate

- DELETE **/loot/delete/:id**</br>
  API ini menghapus document berdasarkan id yang diberikan pada params

## Dokumentasi Docker

Docker Hub: https://hub.docker.com/r/nahlsyareza/be-mc

### Requirement

1. Pastikan Docker sudah terinstall

2. Instalasi Docker bisa diverifikasi dengan command docker version di command prompt

3. Pastikan juga kalian sudah menjalankan Docker Desktop

### Menjalankan Docker

1. Melakukan pull untuk ketiga image ini:

```
docker pull nahlsyareza/be-mc:latest
docker pull nahlsyareza/fe-mc:latest
docker pull mongo
```

2. Membuat file docker compose dengan isi berikut:

```
version: "3.8"
services:
  frontend:
    image: nahlsyareza/fe-mc
    container_name: fe-mc
    ports:
      - 4002:4002
    networks:
      - mc-network
  backend:
    image: nahlsyareza/be-mc
    container_name: be-mc
    ports:
      - 4001:4001
    networks:
      - mc-network
  database:
    image: mongo
    container_name: mongodb
    ports:
      - 27017:27017
    networks:
      - mc-network

networks:
  mc-network:
    external: true
```

3. Jalankan
```
docker compose up
```


4. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass) dan buat koneksi baru dengan connection string ini

```
mongodb://localhost:27017
```

5. Akan dibuat database baru bernama **major_computer**. Buka database dan masuk ke collection. Masukkan data-data yang ada pada folder **data** di repository ini sesuai dengan nama file dan collection.

6. Backend bisa diakses pada [http://localhost:4001](http://localhost:4001). Frontend dapat diakses pada [http://localhost:4002](http://localhost:4002)
