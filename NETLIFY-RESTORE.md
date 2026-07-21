# Netlify production restore points

Updated: `2026-07-21T13:53:00Z`

GitHub monorepo: [satvik2131/bookforge-landing-pages](https://github.com/satvik2131/bookforge-landing-pages)

These deploys were **locked** before/while linking the monorepo. Netlify continuous builds are **stopped** on all sites.

## Sites

| Folder | Netlify site | Domain | Deploy ID | Permalink |
|---|---|---|---|---|
| `lost-american-memories` | `melodic-narwhal-056db4` (`cf9b415c-bfa8-4d85-9dc5-224aca656d41`) | lostamericanmemories.com | `6a58c226c388cb0008979c89` | https://6a58c226c388cb0008979c89--melodic-narwhal-056db4.netlify.app |
| `stop-wasting-stuff` | `stop-wasting-stuff` (`e6cd8504-9b8e-47e0-8054-0dabefa9b417`) | stopwastingstuff.com | `6a5ddb00bbff5a0d0c9b995d` | https://6a5ddb00bbff5a0d0c9b995d--stop-wasting-stuff.netlify.app |
| `forgotten-american-survival` | `forgotten-american-survival` (`f899c07c-0fed-4ad1-bf1d-648cb7fd6d75`) | forgottenamericansurvival.com | `6a5e4cbbee1445677dad8388` | https://6a5e4cbbee1445677dad8388--forgotten-american-survival.netlify.app |
| `carlyfe` | `carlyfe` (`3e62de15-3fad-4694-927e-fe6fb8df33ca`) | carlyfeyoutube.com | `6a5e395f91b77a425a300148` | https://6a5e395f91b77a425a300148--carlyfe.netlify.app |
| `american-food-history` | `american-food-history` (`23415047-6744-43f7-9c75-290707a8d00c`) | americanfoodhistory.com | `6a5e4cbb6ea9bb6f69da68cb` | https://6a5e4cbb6ea9bb6f69da68cb--american-food-history.netlify.app |
| `british-nostalgia` | `british-nostalgia` (`3c74014f-721b-44a4-9da7-0d1ebcb0dbe9`) | britishnostalgiastore.com | `6a5ddc945d55bf12f6983830` | https://6a5ddc945d55bf12f6983830--british-nostalgia.netlify.app |
| `forgotten-american-weapons` | `forgotten-american-weapons` (`ce6dd42a-b125-4349-8c70-09d2cc5dcd85`) | forgottenamericanweapons.com | `6a5e4cbb316e8f67875f283c` | https://6a5e4cbb316e8f67875f283c--forgotten-american-weapons.netlify.app |
| `forgotten-american-skills` | `forgotten-american-skills` (`8da0d09b-a235-4194-be3e-fb5c3d85f1d2`) | https://forgotten-american-skills.netlify.app | `6a5f721fc50b27399118a332` | https://6a5f721fc50b27399118a332--forgotten-american-skills.netlify.app |

## Restore

```bash
netlify api restoreSiteDeploy --data '{"site_id":"<SITE_ID>","deploy_id":"<DEPLOY_ID>"}'
```

**lost-american-memories**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"cf9b415c-bfa8-4d85-9dc5-224aca656d41","deploy_id":"6a58c226c388cb0008979c89"}'
```

**stop-wasting-stuff**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"e6cd8504-9b8e-47e0-8054-0dabefa9b417","deploy_id":"6a5ddb00bbff5a0d0c9b995d"}'
```

**forgotten-american-survival**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"f899c07c-0fed-4ad1-bf1d-648cb7fd6d75","deploy_id":"6a5e4cbbee1445677dad8388"}'
```

**carlyfe**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"3e62de15-3fad-4694-927e-fe6fb8df33ca","deploy_id":"6a5e395f91b77a425a300148"}'
```

**american-food-history**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"23415047-6744-43f7-9c75-290707a8d00c","deploy_id":"6a5e4cbb6ea9bb6f69da68cb"}'
```

**british-nostalgia**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"3c74014f-721b-44a4-9da7-0d1ebcb0dbe9","deploy_id":"6a5ddc945d55bf12f6983830"}'
```

**forgotten-american-weapons**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"ce6dd42a-b125-4349-8c70-09d2cc5dcd85","deploy_id":"6a5e4cbb316e8f67875f283c"}'
```

**forgotten-american-skills**

```bash
netlify api restoreSiteDeploy --data '{"site_id":"8da0d09b-a235-4194-be3e-fb5c3d85f1d2","deploy_id":"6a5f721fc50b27399118a332"}'
```
