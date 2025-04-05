const { Book, Category, Author } = require("../models")  
const { Op } = require('sequelize')

// GET books by title
exports.searchBooksByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        if (!title) {
            return res.status(400).json({ message: 'Please enter film title' });
        }
        const books = await Book.findAll({
            where: { title: { [Op.iLike]: `%${title}%` } },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['categoryId', 'name']
                },
                {
                    model: Author,
                    attributes: ['authorId', 'first_name', 'last_name'],
                    through: { attributes: [] }
                }
            ]
        });

        if (books.length === 0) {
            return res.status(404).json({ message: `Book by name "${title}" not found` });
        }
        res.status(200).json(books);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Error searching books', error: error.message });
    }
}

// GET books by author
exports.searchBooksByAuthor = async (req, res) => {
    const { author } = req.params;
    try {
        if (!author) {
            return res.status(400).json({ message: 'Please enter name or surname of author' });
        }

        const books = await Book.findAll({
            include: [
                {
                    model: Author,
                    where: {
                        [Op.or]: [
                            { first_name: { [Op.iLike]: `%${author}%` } },
                            { last_name: { [Op.iLike]: `%${author}%` } }
                        ]
                    },
                    attributes: ['author_id', 'first_name', 'last_name'],
                    through: { attributes: [] }
                },
                {
                    model: Category,
                    as: 'category',
                    attributes: ['categoryId', 'name']
                },
            ],

        });
        if (books.length === 0) {
            return res.status(404).json({ message: `Books what written by "${author}" not found` });
        }

        res.status(200).json(books);

    } catch (error) {
        console.error('Error author searching:', error);
        res.status(500).json({ message: 'Error author searching', error: error.message });
    }
}

// GET books by category
exports.searchBooksByCategory = async (req, res) => {
    const {category_id} = req.params
    console.log('category_id: ', category_id);
    if (!category_id) {
        return res.status(400).json({ message: "Enter the category ID"})
    }

    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Category,
                    where: { category_id },
                    as: 'category',
                    attributes: ['category_id', 'name'],
                },
                {
                    model: Author,
                    attributes: ['authorId', 'first_name', 'last_name'],
                    through: { attributes: [] }
                }
            ]
        });

        if (books.length === 0) {
            return res.status(404).json({ message: `Not found books with category ID ${category_id}` });
        }

        res.status(200).json(books);
    } catch (error) {
        console.error('Error searching books by category:', error);
        res.status(500).json({ message: 'Error searching books by category', error: error.message });
    }
}