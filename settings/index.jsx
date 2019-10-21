function mySettings(props) {
  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            Parrot-Face
          </Text>
        }
      ></Section>
      <Select
        label="Select Theme"
        settingsKey="theme"
        options={[
          {
            name: "Aqua",
            value: {
              background: "#000000",
              foreground: "#3BF7DE"
            }
          },
          {
            name: "Cyan",
            value: {
              background: "#000000",
              foreground: "#14D3F5"
            }
          },
          {
            name: "Lime",
            value: {
              background: "#000000",
              foreground: "#5BE37D"
            }
          },
          {
            name: "Magenta",
            value: {
              background: "#000000",
              foreground: "#F80070"
            }
          },
          {
            name: "Orange",
            value: {
              background: "#000000",
              foreground: "#FC6B3A"
            }
          },
          {
            name: "Mint",
            value: {
              background: "#000000",
              foreground: "#00FF00"
            }
          },
          {
            name: "Purple",
            value: {
              background: "#000000",
              foreground: "#9C27B0"
            }
          },
          {
            name: "Pink",
            value: {
              background: "#000000",
              foreground: "#F83478"
            }
          }
        ]}
      />
      <Section
        title={
          <Text bold align="center">
            Contact
          </Text>
        }
      >
        <Link source="mailto:princessleia1@mail.com">
          <TextImageRow
            label="Email"
            sublabel="princessleia1@mail.com"
            icon="https://github.com/princessleia1/parrot-face/blob/master/resources/email-icon.png?raw=true"
          />
        </Link>
        <Link source="https://github.com/princessleia1">
          <TextImageRow
            label="Github"
            sublabel="https://github.com/princessleia1"
            icon="https://github.com/princessleia1/parrot-face/blob/master/resources/git-icon.png?raw=true"
          />
        </Link>
        <Link source="https://www.paypal.me/KirsteneG">
          <TextImageRow
            label="PayPal"
            sublabel="paypal.me/KirsteneG"
            icon="https://github.com/princessleia1/parrot-face/blob/master/resources/pay-icon.png?raw=true"
          />
        </Link>
      </Section>
      <Section
        title={
          <Text bold align="center">
            Build Version
          </Text>
        }
      >
        <Text>1.0.5 - Update Build for Publish.</Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
