import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Content from "./Community/CommunityContent.js";
import Footer from "./Community/Footer";

const PostScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Content
            profile={require("../assets/img/profile/images2.jpg")}
            name="Steven"
            time="20 min ago"
            image={require("../assets/img/content/girl.webp")}
            view="103"
            love="20"
            comment="53"
          />
          <Content
            profile={require("../assets/img/profile/images3.webp")}
            name="Marget"
            time="9 min ago"
            image={require("../assets/img/content/girl.webp")}
            view="204"
            love="54"
            comment="90"
          />
          <Content
            profile={require("../assets/img/profile/images3.webp")}
            name="Marget"
            time="9 min ago"
            image={require("../assets/img/content/girl.webp")}
            view="204"
            love="54"
            comment="90"
          />
          {/* Add more <Content /> components as needed */}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  statusScroll: {
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
});

export default PostScreen;
