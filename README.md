# Proyek SBD

## Deskripsi

Kami membuat proyek game sederhana yang diimplementasikan menggunakan JavaScript. Game kami terbagi menjadi bagian, yaitu backend dan frontend. Backend di sini berfungsi untuk menghubungi frontend dengan database.

## Dokumentasi API

Terdapat beberapa bagian API dari backend, yaitu

### USER

API ini memiliki model User dan terhubung dengan collection users
User merupakan pengguna yang akan menggunakan game

- POST **/user/create**
  API ini berfungsi untuk membuat akun baru bagi user. API ini membutuhkan data BODY name, email, dan password
- GET **/user/getAll**
  API ini berfungsi untuk menampilkan semua document yang ada pada collection users.
- GET **/user/get/:id**
  API ini berfungsi untuk menampilkan document yang memiliki key id yang sama dengan data params :id.
- POST **/user/login**
  API ini digunakan untuk memverifikasi akun ketika user ingin masuk ke dalam game. Diperlukan data BODY berupa email dan password
- POST **/user/progressXP**
  API ini digunakan untuk menambahkan Level, XP, dan attribute yang dimiliki oleh user. Ia membutuhkan data BODY user dan jumlah xp.

### ITEM

API ini memiliki model BaseItem dan terhubung dengan collection items. Dia memiliki beberapa model tambahan, misalnya Weapon, Spell, Armor, dan Potion.
Item merupakan benda yang bisa digunakan oleh User di game dengan berbagai type dan fungsionalitas.

- POST **/item/create**
  API ini digunakan untuk menambahkan item baru ke dalam game. Item itu sendiri terbagi menjadi beberapa jenis, yaitu Misc, Weapon, Armor, Spell, dan Potion. Masing-masing item memiliki struktur data yang berbeda, namun setiap item memiliki data name, sprite, max_stack, dan type. Weapon memiliki data tambahan atk dan cost. Armor memiliki def. Spell memiliki mgc dan cost, dan potion memiliki data restore dan attribute. Data dimasukkan menggunakan BODY.
- GET **/item/getAll**
  API ini digunakan untuk menampilkan semua jenis item yang ada pada database
- GET **/item/get/:id**
  API ini membutuhkan params dan akan mengembalikan item yang spesifik. Hanya dengan menggunakan id, ia mampu memberikan data Item tersebut, apapun type-nya.
- DELETE **/item/delete/:id**
  API ini berfungsi menghapus dokumen dari collection berdasarkan id.

### ENEMY

API ini memiliki model Enemy dan terhubung dengan collection enemies.
Enemy merupakan musuh yang akan dilawan oleh User.

- POST **/enemy/create**
  API ini membuat document baru terhadap collection. Dibutuhkan data dalam bentuk BODY yang memiliki nilai untuk name, max_hp, level, atk, def, mgc, sprite, bg, dan biome.
- GET **/enemy/getAll**
  API ini akan menampilkan semua document yang ada pada collection enemies.
- GET **/enemy/get/:id**
  API ini mengembalikan document spesifik berdasarkan id yang sesuai dengan id pada params
- GET **/enemy/getLevelled?level=&biome=**
  API ini digunakan untuk mendapatkan document tertentu berdasarkan rentang level dan biome spesifik. Backend ini digunakan ketika akan melakukan duel.
- DELETE **/enemy/delete/:id**
  API ini menghapus document dari collection enemies yang memiliki id yang sama dengan params.

### INVENTORY

API ini memiliki model Inventory dan terhubung dengan collection inventories. Ia memiliki ref terhadap collection items dan users.
Inventory menyimpan relasi antara Item dan User. User yang berbeda dapat memiliki Item yang sama, namun dalam jumlah count yang berbeda.

- POST **/inv/add**
  API ini digunakan untuk menambahkan item baru terhadap inventory user. Kita tidak bisa langsung menghubungkan user dan item karena diperlukan item count atas item tersebut, yang dilakukan oleh Inventory. Count yang diberikan juga tidak bisa melebihi batas max_stack yang dimiliki oleh item tersebut. Jika lebih, maka akan diberikan count sesuai dengan max_stack Item.

- GET **/inv/getAll**
  API ini mengembalikan semua document yang ada pada collection inventories.

- GET **/inv/getAll/p**
  API ini berfungsi mirip dengan API sebelumnya, namun mengembalikan document yang sudah di-populate, karena terdapat value yang disimpan berupa id dari collection lain.

- GET **/inv/get/:id**
  API ini mengembalikan document spesifik yang memiliki id yang sama dengan id yang diberikan di params.

- GET **/inv/get/p/:id**
  API ini mirip dengan sebelumnya, namun menggunakan fungsi populate.

- PUT **/inv/remove**
  API ini berfungsi untuk menghilangkan count dari item dengan jumlah yang sudah ditentukan. Jika item memiliki nilai kurang dari 1, maka dia akan dihapus dari document. Ia menggunakan data BODY dan membutuhkan data user, item, dan count.

- DELETE **/inv/delete/:id**
  API ini menghapus document sesuai id yang ada pada collection.

### LOOT

API ini memiliki model Loot dan collection loots. Dia memiliki dua tipe model yaitu enemy_loot dan merchant_loot. Ia memiliki ref berupa item.
Loot dapat digunakan sebagai reward ketika mengalahkan musuh atau dijual oleh NPC di game. Loot yang diberikan sesuai dengan ambang level yang dimiliki user

- POST **/loot/create**
  API ini digunakan untuk membuat document Loot baru. Dia menggunakan BODY dan membutuhkan data type, item, dan level. Data tambahannya yaitu biome untuk enemy_loot atau merchant untuk merchant_loot

- GET **/loot/getAll**
  API ini digunakan untuk melihat semua document pada collection

- GET **/loot/getLevelled/?biome=forest&level=**
  API ini digunakan untuk mengambil satu buah dokumen secara random. Document yang diberikan adalah document yang memiliki level lebih rendah atau sama dengan dari level yang diinput, dalam kasus ini yaitu level user.

- GET **/loot/getLevelled/p/?biome**
  API ini mirip dengan sebelumnya namun menggunakan populate pada field item.

- GET **/loot/getMerchant/:merchant**
  API ini akan memberikan data berupa Loot yang memiliki value merchant yang sama dengan params.

- GET **/loot/getMerchant/:merchant**
  API ini mirip dengan sebelumnya namun dengan populate

- DELETE **/loot/delete/:id**
  API ini menghapus document berdasarkan id yang diberikan pada params

## Dokumentasi Docker

Docker Hub: https://hub.docker.com/r/nahlsyareza/be-mc

### Cara Menjalankan dengan Docker

1. Pastikan Docker sudah terinstall

2. Jalankan container

   ```
   docker run -d -p 4000:4000 --name be-mc nahlsyareza/be-mc
   ```

   Keterangan:
   - `-d`: Menjalankan container di background
   - `-p 4000:4000`: Mapping port lokal ke port container
   - `--name be-mc`: Menentukan nama container
   - `nahlsyareza/be-mc`: Nama image dari Docker Hub

## Menghentikan dan Menghapus Container

1. Stop container

  ```
  docker stop be-mc
  ```

2. Hapus container

  ```
  docker rm be-mc
  ```

3. Menghapus Image

```
docker rmi nahlsyareza/be-mc
```