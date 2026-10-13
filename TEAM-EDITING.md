# Team editing

The About page reads the team from `data/team.ts` and the profile images from `public/team/`.

The current project contains the four supplied team portraits:

- `public/team/anna-weber.jpg`
- `public/team/sophie-keller.jpg`
- `public/team/lukas-schneider.webp`
- `public/team/mehdi-mehrnam.png`

## Change a name, role, bio, skills or picture

Open `data/team.ts` and edit the matching object.

```ts
{
  id: 'anna-weber',
  name: 'Your name',
  role: {
    de: 'Rolle auf Deutsch',
    en: 'Role in English',
  },
  bio: {
    de: 'Kurze Beschreibung auf Deutsch.',
    en: 'Short English description.',
  },
  skills: ['React', 'TypeScript', 'UI/UX'],
  photo: '/team/your-photo.webp',
  kind: 'member',
}
```

Put the new image in `public/team/` and set its public path in `photo`.

The current four names/photos came directly from the portraits supplied for this version. The three colleague profiles use `kind: 'member'`; the CEO profile uses `kind: 'owner'`.
