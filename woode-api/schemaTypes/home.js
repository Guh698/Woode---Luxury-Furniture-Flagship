import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slogan',
      title: 'Hero Slogan',
      type: 'text',
    }),

    defineField({
      name: 'heroImages',
      title: 'Galeria Hero (Loop)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: 'editTitle',
      title: 'The edit title',
      type: 'string',
    }),

    defineField({
      name: 'editFirstText',
      title: 'The edit first text',
      type: 'text',
    }),

    {
      name: 'editFirstProduct',
      title: 'First Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the first slot.',
    },

    defineField({
      name: 'hoverimg1',
      title: 'The Edit - Imagem 1 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    {
      name: 'editSecondProduct',
      title: 'Second Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the second slot.',
    },

    defineField({
      name: 'hoverimg2',
      title: 'The Edit - Imagem 2 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    {
      name: 'editThirdProduct',
      title: 'Third Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the third slot.',
    },

    defineField({
      name: 'hoverimg3',
      title: 'The Edit - Imagem 3 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    {
      name: 'editFourthProduct',
      title: 'Fourth Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the fourth slot.',
    },

    defineField({
      name: 'hoverimg4',
      title: 'The Edit - Imagem 4 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    {
      name: 'editFifthProduct',
      title: 'Fifth Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the fifth slot.',
    },

    defineField({
      name: 'hoverimg5',
      title: 'The Edit - Imagem 5 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    {
      name: 'editSixthProduct',
      title: 'Sixth Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the sixth slot.',
    },
    defineField({
      name: 'hoverimg6',
      title: 'The Edit - Imagem 6 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    {
      name: 'editSeventhProduct',
      title: 'Seventh Product (The Edit)',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select the product to feature in the seventh slot.',
    },

    defineField({
      name: 'hoverimg7',
      title: 'The Edit - Imagem 7 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editSecondText',
      title: 'The edit second text',
      type: 'text',
    }),
  ],
})
