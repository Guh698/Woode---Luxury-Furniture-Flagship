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

    defineField({
      name: 'editFirstImage',
      title: 'The Edit - Imagem 1',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'hoverimg1',
      title: 'The Edit - Imagem 1 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editSecondImage',
      title: 'The Edit - Imagem 2',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'hoverimg2',
      title: 'The Edit - Imagem 2 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editThirdImage',
      title: 'The Edit - Imagem 3',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'hoverimg3',
      title: 'The Edit - Imagem 3 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editFourthImage',
      title: 'The Edit - Imagem 4',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'hoverimg4',
      title: 'The Edit - Imagem 4 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editFifthImage',
      title: 'The Edit - Imagem 5',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'hoverimg5',
      title: 'The Edit - Imagem 5 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editSixthImage',
      title: 'The Edit - Imagem 6',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'hoverimg6',
      title: 'The Edit - Imagem 6 (hovered)',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

    defineField({
      name: 'editSeventhImage',
      title: 'The Edit - Imagem 7',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),

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
