import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTravelersCompany } from "@/features/TravelersCompany/TravelersCompanySlice";

const TravlingCompany = ({ errorTravelingCompany }) => {
  const travelerCompany = useSelector(
    (state) => state.travelersCompanyFilter.value
  );
  const dispatch = useDispatch();

  const imageMap = {
    solo_user: require("../assets/images/solo_user.png"),
    couple_user: require("../assets/images/couple_user.png"),
    family_user: require("../assets/images/family_user.png"),
    friends_user: require("../assets/images/friends_user.png"),
  };

  const userTypes = ["solo_user", "couple_user", "family_user", "friends_user"];

  const handlePress = (index, el) => {
    dispatch(
      setTravelersCompany({ travelersCompany: el, travelersCompanyId: index })
    );
  };

  return (
    <View>
      <Text style={styles.mainText}>Traveling with</Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {userTypes.map((el, index) => (
            <Pressable
              key={index}
              onPress={() => handlePress(index, el)}
              style={{
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    index === travelerCompany.travelersCompanyId
                      ? "#74AD8C"
                      : "transparent",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                }}
              >
                <Image
                  source={imageMap[el]}
                  style={index === 0 ? styles.iconSolo : styles.icon}
                  resizeMode="contain"
                />
                <Text>{el.replace("_user", "").replace("_", " ")}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        {!travelerCompany.travelersCompany && errorTravelingCompany && (
          <View>
            <Text style={styles.errorText}>{errorTravelingCompany}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TravlingCompany;

const styles = StyleSheet.create({
  icon: {
    width: 55,
    height: 30,
  },
  iconSolo: {
    width: 35,
    height: 31,
  },
  mainText: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
