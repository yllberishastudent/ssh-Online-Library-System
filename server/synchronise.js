const db = require("./models");

// Synchronize all models with the database in a specific order
db.sequelize
  .sync({ force: true })
  .then(() => db.Ability.sync())
  .then(() => {
    // Inserting abilities into the Abilities table
    return db.Ability.bulkCreate([
      { name: "ReadBook" },
      { name: "LeaveReview" },
      { name: "AddToFavorites" },
      { name: "SearchBooks" },
      { name: "ViewBookDetails" },
      { name: "UpdateProfile" },
      { name: "ChangePassword" },
      { name: "ManageBooks" },
      { name: "ManageUsers" },
      { name: "ManageReviews" },
      { name: "ViewAnalytics" },
      { name: "ManageAbilities" },
      { name: "DeleteAccount" },
      { name: "CreateGenre" },
      { name: "EditGenre" },
      { name: "DeleteGenre" },
      { name: "DeleteReview" },
    ]);
  })
  .then(() => db.Author.sync())
  .then(() => {
    // Inserting authors into the Authors table
    return db.Author.bulkCreate([
      {
        first_name: "Harper",
        last_name: "Lee",
        pen_name: null,
        gender: "female",
        country: "United States",
        active: true,
      },
      {
        first_name: "George",
        last_name: "Orwell",
        pen_name: null,
        gender: "male",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "J.D.",
        last_name: "Salinger",
        pen_name: null,
        gender: "male",
        country: "United States",
        active: true,
      },
      {
        first_name: "Jane",
        last_name: "Austen",
        pen_name: null,
        gender: "female",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "F. Scott",
        last_name: "Fitzgerald",
        pen_name: null,
        gender: "male",
        country: "United States",
        active: true,
      },
      {
        first_name: "Aldous",
        last_name: "Huxley",
        pen_name: null,
        gender: "male",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "Charlotte",
        last_name: "Bronte",
        pen_name: null,
        gender: "female",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "Emily",
        last_name: "Bronte",
        pen_name: null,
        gender: "female",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "Oscar",
        last_name: "Wilde",
        pen_name: null,
        gender: "male",
        country: "Ireland",
        active: true,
      },
      {
        first_name: "Gabriel Garcia",
        last_name: "Marquez",
        pen_name: null,
        gender: "male",
        country: "Colombia",
        active: true,
      },
      {
        first_name: "Fyodor",
        last_name: "Dostoevsky",
        pen_name: null,
        gender: "male",
        country: "Russia",
        active: true,
      },
      {
        first_name: "Alexandre",
        last_name: "Dumas",
        pen_name: null,
        gender: "male",
        country: "France",
        active: true,
      },
      {
        first_name: "Victor",
        last_name: "Hugo",
        pen_name: null,
        gender: "male",
        country: "France",
        active: true,
      },
      {
        first_name: "Mark",
        last_name: "Twain",
        pen_name: null,
        gender: "male",
        country: "United States",
        active: true,
      },
      {
        first_name: null,
        last_name: "Homer",
        pen_name: null,
        gender: null,
        country: null,
        active: true,
      },
      {
        first_name: "Virginia",
        last_name: "Woolf",
        pen_name: null,
        gender: "female",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "William",
        last_name: "Faulkner",
        pen_name: null,
        gender: "male",
        country: "United States",
        active: true,
      },
      {
        first_name: "Ralph",
        last_name: "Ellison",
        pen_name: null,
        gender: "male",
        country: "United States",
        active: true,
      },
      {
        first_name: "Toni",
        last_name: "Morrison",
        pen_name: null,
        gender: "female",
        country: "United States",
        active: true,
      },
      {
        first_name: "Charles",
        last_name: "Dickens",
        pen_name: null,
        gender: "male",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "Homer",
        last_name: "",
        pen_name: null,
        gender: "",
        country: "",
        active: true,
      },
      {
        first_name: "Mary",
        last_name: "Shelley",
        pen_name: null,
        gender: "female",
        country: "",
        active: true,
      },
      {
        first_name: "Dante",
        last_name: "Alighieri",
        pen_name: null,
        gender: "male",
        country: "",
        active: true,
      },
      {
        first_name: "Leo",
        last_name: "Tolstoy",
        pen_name: null,
        gender: "male",
        country: "Russia",
        active: true,
      },
      {
        first_name: "Lewis",
        last_name: "Carroll",
        pen_name: null,
        gender: "male",
        country: "United Kingdom",
        active: true,
      },
      {
        first_name: "Antoine de",
        last_name: "Saint-Exupéry",
        pen_name: null,
        gender: "male",
        country: "France",
        active: true,
      },
      {
        first_name: "Miguel de",
        last_name: "Cervantes",
        pen_name: null,
        gender: "male",
        country: "Spain",
        active: true,
      },
      {
        first_name: "Homer",
        last_name: "",
        pen_name: null,
        gender: "",
        country: "",
        active: true,
      },
      {
        first_name: "William",
        last_name: "Faulkner",
        pen_name: null,
        gender: "male",
        country: "United States",
        active: true,
      },
      {
        first_name: "Margaret",
        last_name: "Mitchell",
        pen_name: null,
        gender: "female",
        country: "United States",
        active: true,
      },
    ]);
  })
  .then(() => db.Book.sync())
  .then(() =>
    db.Book.bulkCreate([
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        author_id: 1,
        description:
          "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
        cover_image_url: "images/to_kill_a_mockingbird.jpg",
        pdf_file_url: "pdfs/to_kill_a_mockingbird.pdf",
        price: 10.99,
      },
      {
        title: "1984",
        author: "George Orwell",
        author_id: 2,
        description:
          "A dystopian social science fiction novel that follows the life of Winston Smith, a low-ranking member of the ruling Party, in a totalitarian state.",
        cover_image_url: "images/1984.jpg",
        pdf_file_url: "pdfs/1984.pdf",
        price: 12.99,
      },
      {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        author_id: 3,
        description:
          "A novel about a teenager named Holden Caulfield who wanders around New York City after being expelled from school.",
        cover_image_url: "images/the_catcher_in_the_rye.jpg",
        pdf_file_url: "pdfs/the_catcher_in_the_rye.pdf",
        price: 9.99,
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        author_id: 4,
        description:
          "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
        cover_image_url: "images/pride_and_prejudice.jpg",
        pdf_file_url: "pdfs/pride_and_prejudice.pdf",
        price: 11.99,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        author_id: 5,
        description:
          "The novel chronicles an era that Fitzgerald himself dubbed the 'Jazz Age'.",
        cover_image_url: "images/the_great_gatsby.jpg",
        pdf_file_url: "pdfs/the_great_gatsby.pdf",
        price: 8.99,
      },
      {
        title: "Animal Farm",
        author: "George Orwell",
        author_id: 6,
        description:
          "A novella that tells the story of a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
        cover_image_url: "images/animal_farm.jpg",
        pdf_file_url: "pdfs/animal_farm.pdf",
        price: 7.99,
      },
      {
        title: "Brave New World",
        author: "Aldous Huxley",
        author_id: 7,
        description:
          "A dystopian novel that imagines a future society where people are genetically engineered and socially conditioned to be passive and obedient.",
        cover_image_url: "images/brave_new_world.jpg",
        pdf_file_url: "pdfs/brave_new_world.pdf",
        price: 10.99,
      },
      {
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        author_id: 8,
        description:
          "A novel that follows the story of Jane, a governess who falls in love with her employer, Mr. Rochester.",
        cover_image_url: "images/jane_eyre.jpg",
        pdf_file_url: "pdfs/jane_eyre.pdf",
        price: 9.99,
      },
      {
        title: "Wuthering Heights",
        author: "Emily Bronte",
        author_id: 9,
        description:
          "A novel that tells the story of Heathcliff and his passionate love for Catherine Earnshaw.",
        cover_image_url: "images/wuthering_heights.jpg",
        pdf_file_url: "pdfs/wuthering_heights.pdf",
        price: 8.99,
      },
      {
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        author_id: 10,
        description:
          "A novel that tells the story of Dorian Gray, a young man who becomes obsessed with his own youth and beauty.",
        cover_image_url: "images/the_picture_of_dorian_gray.jpg",
        pdf_file_url: "pdfs/the_picture_of_dorian_gray.pdf",
        price: 11.99,
      },
      {
        title: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        author_id: 11,
        description:
          "A novel that tells the story of the Buendia family and the fictional town of Macondo.",
        cover_image_url: "images/one_hundred_years_of_solitude.jpg",
        pdf_file_url: "pdfs/one_hundred_years_of_solitude.pdf",
        price: 12.99,
      },
      {
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        author_id: 12,
        description:
          "A novel that explores themes of faith, doubt, reason, and free will through the story of three brothers and their father.",
        cover_image_url: "images/the_brothers_karamazov.jpg",
        pdf_file_url: "pdfs/the_brothers_karamazov.pdf",
        price: 13.99,
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        author_id: 13,
        description:
          "A novel that follows the story of Rodion Raskolnikov, a poor ex-student in St. Petersburg who conceives a plan to kill an unscrupulous pawnbroker for her money.",
        cover_image_url: "images/crime_and_punishment.jpg",
        pdf_file_url: "pdfs/crime_and_punishment.pdf",
        price: 10.99,
      },
      {
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        author_id: 14,
        description:
          "A novel that tells the story of Edmond Dantès, a young man who is betrayed and imprisoned, and his subsequent quest for revenge.",
        cover_image_url: "images/the_count_of_monte_cristo.jpg",
        pdf_file_url: "pdfs/the_count_of_monte_cristo.pdf",
        price: 11.99,
      },
      {
        title: "Les Misérables",
        author: "Victor Hugo",
        author_id: 15,
        description:
          "A novel that follows the life of ex-convict Jean Valjean and his struggles for redemption and freedom, set against the backdrop of the June Rebellion in France.",
        cover_image_url: "images/les_miserables.jpg",
        pdf_file_url: "pdfs/les_miserables.pdf",
        price: 12.99,
      },
      {
        title: "The Adventures of Huckleberry Finn",
        author: "Mark Twain",
        author_id: 16,
        description:
          "A novel that follows the adventures of a young boy named Huck Finn and his friend Jim, a runaway slave, as they travel down the Mississippi River.",
        cover_image_url: "images/the_adventures_of_huckleberry_finn.jpg",
        pdf_file_url: "pdfs/the_adventures_of_huckleberry_finn.pdf",
        price: 9.99,
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        author_id: 17,
        description:
          "A novel that tells the story of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge against the giant white sperm whale, Moby Dick.",
        cover_image_url: "images/moby_dick.jpg",
        pdf_file_url: "pdfs/moby_dick.pdf",
        price: 10.99,
      },
      {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        author_id: 18,
        description:
          "A fantasy epic that follows the quest of a hobbit named Frodo Baggins to destroy a powerful ring and defeat the Dark Lord Sauron.",
        cover_image_url: "images/the_lord_of_the_rings.jpg",
        pdf_file_url: "pdfs/the_lord_of_the_rings.pdf",
        price: 14.99,
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        author_id: 19,
        description:
          "A fantasy novel that precedes The Lord of the Rings and follows the adventures of Bilbo Baggins, a hobbit who is reluctantly recruited to join a group of dwarves on a quest to reclaim their homeland.",
        cover_image_url: "images/the_hobbit.jpg",
        pdf_file_url: "pdfs/the_hobbit.pdf",
        price: 9.99,
      },
      {
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        author_id: 20,
        description:
          "A historical novel that takes place in London and Paris before and during the French Revolution.",
        cover_image_url: "images/a_tale_of_two_cities.jpg",
        pdf_file_url: "pdfs/a_tale_of_two_cities.pdf",
        price: 11.99,
      },
      {
        title: "The Odyssey",
        author: "Homer",
        author_id: 21,
        description:
          "An epic poem that follows the story of Odysseus, the Greek hero of the Trojan War, as he tries to return home to Ithaca.",
        cover_image_url: "images/the_odyssey.jpg",
        pdf_file_url: "pdfs/the_odyssey.pdf",
        price: 8.99,
      },
      {
        title: "Frankenstein",
        author: "Mary Shelley",
        author_id: 22,
        description:
          "A Gothic novel that tells the story of Victor Frankenstein, a young scientist who creates a grotesque creature in an unorthodox scientific experiment.",
        cover_image_url: "images/frankenstein.jpg",
        pdf_file_url: "pdfs/frankenstein.pdf",
        price: 10.99,
      },
      {
        title: "The Divine Comedy",
        author: "Dante Alighieri",
        author_id: 23,
        description:
          "An epic poem that describes Dante's journey through Hell, Purgatory, and Heaven, guided by the poet Virgil.",
        cover_image_url: "images/the_divine_comedy.jpg",
        pdf_file_url: "pdfs/the_divine_comedy.pdf",
        price: 12.99,
      },
      {
        title: "War and Peace",
        author: "Leo Tolstoy",
        author_id: 24,
        description:
          "A historical novel that tells the story of five Russian aristocratic families and their experiences during the Napoleonic Wars.",
        cover_image_url: "images/war_and_peace.jpg",
        pdf_file_url: "pdfs/war_and_peace.pdf",
        price: 13.99,
      },
      {
        title: "Alice's Adventures in Wonderland",
        author: "Lewis Carroll",
        author_id: 25,
        description:
          "A fantasy novel about a girl named Alice who falls through a rabbit hole into a fantasy world populated by peculiar creatures.",
        cover_image_url: "images/alices_adventures_in_wonderland.jpg",
        pdf_file_url: "pdfs/alices_adventures_in_wonderland.pdf",
        price: 9.99,
      },
      {
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        author_id: 26,
        description:
          "A novella that tells the story of a young prince who travels from planet to planet, meeting various inhabitants and learning important life lessons.",
        cover_image_url: "images/the_little_prince.jpg",
        pdf_file_url: "pdfs/the_little_prince.pdf",
        price: 8.99,
      },
      {
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        author_id: 27,
        description:
          "A novel that follows the adventures of Alonso Quixano, an elderly man who becomes obsessed with the chivalrous ideals of knighthood and sets out on a quest to revive chivalry.",
        cover_image_url: "images/don_quixote.jpg",
        pdf_file_url: "pdfs/don_quixote.pdf",
        price: 11.99,
      },
      {
        title: "The Iliad",
        author: "Homer",
        author_id: 28,
        description:
          "An ancient Greek epic poem that tells the story of the Trojan War.",
        cover_image_url: "images/the_iliad.jpg",
        pdf_file_url: "pdfs/the_iliad.pdf",
        price: 8.99,
      },
      {
        title: "The Sound and the Fury",
        author: "William Faulkner",
        author_id: 29,
        description:
          "A novel that follows the Compson family in Jefferson, Mississippi, focusing on the decline and fall of the family and its members.",
        cover_image_url: "images/the_sound_and_the_fury.jpg",
        pdf_file_url: "pdfs/the_sound_and_the_fury.pdf",
        price: 10.99,
      },
      {
        title: "Gone with the Wind",
        author: "Margaret Mitchell",
        author_id: 30,
        description:
          "A historical novel that takes place in the American South during the Civil War and Reconstruction era.",
        cover_image_url: "images/gone_with_the_wind.jpg",
        pdf_file_url: "pdfs/gone_with_the_wind.pdf",
        price: 12.99,
      },
    ])
  )
  .then(() => db.Category.sync())
  .then(() => {
    // Inserting categories into the Categories table
    return db.Category.bulkCreate([
      { category_name: "Fiction" },
      { category_name: "Non-fiction" },
      { category_name: "Science fiction" },
      { category_name: "Fantasy" },
      { category_name: "Romance" },
      { category_name: "Mystery" },
      { category_name: "Horror" },
      { category_name: "Biography" },
      { category_name: "History" },
      { category_name: "Cooking" },
      { category_name: "Fiction" },
      { category_name: "Non-fiction" },
      { category_name: "Science fiction" },
      { category_name: "Fantasy" },
      { category_name: "Romance" },
      { category_name: "Mystery" },
      { category_name: "Horror" },
      { category_name: "Biography" },
      { category_name: "History" },
      { category_name: "Cooking" },
    ]);
  })
  .then(() => db.BookCategory.sync())
  .then(() => db.Role.sync())
  .then(() => {
    // Inserting roles "admin" and "basic" with IDs 1 and 2 respectively
    return db.Role.bulkCreate([
      { id: 1, name: "admin" },
      { id: 2, name: "basic" },
    ]);
  })
  .then(() => db.RoleAbility.sync())
  .then(() => {
    return db.RoleAbility.bulkCreate([
      // Assign abilities to the admin role (id: 1)
      { roleId: 1, abilityId: 6 }, // UpdateProfile
      { roleId: 1, abilityId: 7 }, // ChangePassword
      { roleId: 1, abilityId: 8 }, // ManageBooks
      { roleId: 1, abilityId: 9 }, // ManageUsers
      { roleId: 1, abilityId: 10 }, // ManageReviews
      { roleId: 1, abilityId: 11 }, // ViewAnalytics
      { roleId: 1, abilityId: 12 }, // ManageAbilities
      { roleId: 1, abilityId: 13 }, // DeleteAccount
      { roleId: 1, abilityId: 14 }, // CreateGenre
      { roleId: 1, abilityId: 15 }, // EditGenre
      { roleId: 1, abilityId: 16 }, // DeleteGenre
      { roleId: 1, abilityId: 17 }, // DeleteReview

      // Assign abilities to the basic role (id: 2)
      { roleId: 2, abilityId: 1 }, // ReadBook
      { roleId: 2, abilityId: 2 }, // LeaveReview
      { roleId: 2, abilityId: 3 }, // AddToFavorites
      { roleId: 2, abilityId: 4 }, // SearchBooks
      { roleId: 2, abilityId: 5 }, // ViewBookDetails
    ]);
  })
  .then(() => db.User.sync())
  .then(() => {
    return db.User.bulkCreate([
      {
        username: "Admin",
        email: "user@example.com",
        phone_number: "+1234167890",
        password:
          "$2b$10$fxEsuXCOGUFRV5/BVeBUmOzcdBifbPqxD.2GXJAkdDg/QAZoKIH7u",
        account_balance: 0.0,
        role: "Admin",
        roleId: 1,
      },
    ]);
  })
  .then(() => db.Membership.sync())
  .then(() => db.User_History.sync())
  .then(() => db.Transaction.sync())
  .then(() => db.UserInfo.sync())
  .then(() => db.Favorite.sync())
  .then(() => db.Review.sync())
  .then(() => db.Faq.sync())
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("An error occurred while synchronizing the models:", error);
  });
