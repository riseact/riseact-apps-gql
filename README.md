# Riseact GraphQL Explorer

## Development

You will need the official [Riseact CLI](https://github.com/riseact/cli), a
Risact Partner account and a [ngrok](https://ngrok.com/) account.

Install the CLI:

```bash
pip install riseact
```

With the CLI installed you only need to run:

```bash
riseact app dev
```

If necessary, the CLI will authenticate you, ask for a ngrok token and ask to
link this codebase to an existing app or create a new one.

After that, you can access the application at the ngrok link that will appear at
the bottom of your terminal.

The application will automatically reload when you make changes to the source
code.

## License

MIT
