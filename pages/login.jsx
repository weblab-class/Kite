<SafeAreaView
  style={{
    flex: 1,
    backgroundColor: "#FFFFFF",
  }}
>
  <ScrollView
    horizontal
    style={{
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#2A3A43",
      paddingTop: 74,
      paddingBottom: 109,
      paddingLeft: 164,
      paddingRight: 141,
      shadowColor: "#00000040",
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 4,
      elevation: 4,
    }}
  >
    <Image
      source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
      resizeMode={"stretch"}
      style={{
        width: 202,
        height: 683,
        marginTop: 34,
        marginRight: 67,
      }}
    />
    <View
      style={{
        width: 733,
        backgroundColor: "#FFFFFF",
        paddingTop: 12,
        marginRight: 91,
      }}
    >
      <Text
        style={{
          color: "#5B788A",
          fontSize: 48,
          textAlign: "center",
          marginBottom: 109,
        }}
      >
        {"Made with <3 by Susan and Alice"}
      </Text>
      <Text
        style={{
          color: "#9F9F9F",
          fontSize: 128,
          marginBottom: 33,
          marginLeft: 202,
        }}
      >
        {"Smog"}
      </Text>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 426,
            height: 83,
            backgroundColor: "#FFFFFF",
            shadowColor: "#00000040",
            shadowOpacity: 0.3,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4,
            elevation: 4,
          }}
        ></View>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            paddingTop: 26,
            paddingBottom: 12,
            paddingHorizontal: 39,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 40,
            }}
          >
            {"sign in with Google"}
          </Text>
        </View>
      </View>
    </View>
    <Image
      source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
      resizeMode={"stretch"}
      style={{
        width: 202,
        height: 683,
        marginTop: 34,
      }}
    />
  </ScrollView>
</SafeAreaView>;
