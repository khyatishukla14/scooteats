#include <algorithm>
#include <fstream>
#include <iostream>
#include <memory>
#include <sstream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

#include "vendor/httplib.h"

using namespace std;

enum class FoodType { Veg, NonVeg };

string foodTypeToString(FoodType type) {
  return (type == FoodType::Veg) ? "veg" : "non-veg";
}

string escapeJson(const string& input) {
  string out;
  out.reserve(input.size());
  for (char c : input) {
    if (c == '\\' || c == '"') {
      out.push_back('\\');
      out.push_back(c);
    } else if (c == '\n') {
      out += "\\n";
    } else {
      out.push_back(c);
    }
  }
  return out;
}

class MenuItem {
 private:
  int id_;
  string name_;
  double price_;
  FoodType type_;

 public:
  MenuItem(int id, string name, double price, FoodType type)
      : id_(id), name_(std::move(name)), price_(price), type_(type) {}
  int id() const { return id_; }
  const string& name() const { return name_; }
  double price() const { return price_; }
  FoodType type() const { return type_; }
};

class Restaurant {
 private:
  int id_;
  string name_;
  string cuisine_;
  vector<MenuItem> menu_;

 public:
  Restaurant(int id, string name, string cuisine)
      : id_(id), name_(std::move(name)), cuisine_(std::move(cuisine)) {}
  int id() const { return id_; }
  const string& name() const { return name_; }
  const string& cuisine() const { return cuisine_; }
  const vector<MenuItem>& menu() const { return menu_; }
  void addItem(const MenuItem& item) { menu_.push_back(item); }
};

class PromoCode {
 protected:
  string code_;

 public:
  explicit PromoCode(string code) : code_(std::move(code)) {}
  virtual ~PromoCode() = default;
  virtual string mode() const = 0;
  virtual double value() const = 0;
  virtual double discount(double subtotal) const = 0;
};

class FlatDiscountPromo : public PromoCode {
 private:
  double amount_;

 public:
  FlatDiscountPromo(string code, double amount)
      : PromoCode(std::move(code)), amount_(amount) {}
  string mode() const override { return "flat"; }
  double value() const override { return amount_; }
  double discount(double subtotal) const override { return min(subtotal, amount_); }
};

class PercentageDiscountPromo : public PromoCode {
 private:
  double percent_;

 public:
  PercentageDiscountPromo(string code, double percent)
      : PromoCode(std::move(code)), percent_(percent) {}
  string mode() const override { return "percent"; }
  double value() const override { return percent_; }
  double discount(double subtotal) const override { return subtotal * (percent_ / 100.0); }
};

class FoodDeliveryService {
 private:
  vector<Restaurant> restaurants_;
  unordered_map<string, shared_ptr<PromoCode>> promos_;
  int nextOrderId_ = 1001;
  vector<string> feedbacks_;

 public:
  FoodDeliveryService() {
    Restaurant r1(1, "Spice Symphony", "Indian");
    r1.addItem(MenuItem(101, "Paneer Tikka", 220, FoodType::Veg));
    r1.addItem(MenuItem(102, "Butter Chicken", 280, FoodType::NonVeg));
    r1.addItem(MenuItem(103, "Dal Makhani", 190, FoodType::Veg));
    r1.addItem(MenuItem(104, "Chicken Biryani", 320, FoodType::NonVeg));
    r1.addItem(MenuItem(105, "Tandoori Roti Basket", 120, FoodType::Veg));

    Restaurant r2(2, "Dragon Bowl", "Chinese");
    r2.addItem(MenuItem(201, "Veg Hakka Noodles", 180, FoodType::Veg));
    r2.addItem(MenuItem(202, "Chilli Chicken", 250, FoodType::NonVeg));
    r2.addItem(MenuItem(203, "Schezwan Fried Rice", 210, FoodType::Veg));
    r2.addItem(MenuItem(204, "Kung Pao Chicken", 290, FoodType::NonVeg));
    r2.addItem(MenuItem(205, "Spring Rolls", 170, FoodType::Veg));

    Restaurant r3(3, "Roma Slice", "Italian");
    r3.addItem(MenuItem(301, "Margherita Pizza", 240, FoodType::Veg));
    r3.addItem(MenuItem(302, "Chicken Lasagna", 300, FoodType::NonVeg));
    r3.addItem(MenuItem(303, "Pesto Penne", 260, FoodType::Veg));
    r3.addItem(MenuItem(304, "Pepperoni Pizza", 340, FoodType::NonVeg));
    r3.addItem(MenuItem(305, "Mushroom Risotto", 280, FoodType::Veg));

    Restaurant r4(4, "Mexi Fiesta", "Mexican");
    r4.addItem(MenuItem(401, "Bean Burrito", 210, FoodType::Veg));
    r4.addItem(MenuItem(402, "Chicken Tacos", 260, FoodType::NonVeg));
    r4.addItem(MenuItem(403, "Cheese Quesadilla", 230, FoodType::Veg));
    r4.addItem(MenuItem(404, "Beef Nachos", 320, FoodType::NonVeg));
    r4.addItem(MenuItem(405, "Veg Enchilada", 250, FoodType::Veg));

    Restaurant r5(5, "Sushi Harbor", "Japanese");
    r5.addItem(MenuItem(501, "Avocado Maki", 280, FoodType::Veg));
    r5.addItem(MenuItem(502, "Salmon Nigiri", 360, FoodType::NonVeg));
    r5.addItem(MenuItem(503, "Veg Ramen", 300, FoodType::Veg));
    r5.addItem(MenuItem(504, "Chicken Katsu", 340, FoodType::NonVeg));
    r5.addItem(MenuItem(505, "Tofu Teriyaki Bowl", 290, FoodType::Veg));

    Restaurant r6(6, "Mediterra", "Mediterranean");
    r6.addItem(MenuItem(601, "Falafel Wrap", 220, FoodType::Veg));
    r6.addItem(MenuItem(602, "Chicken Shawarma Plate", 310, FoodType::NonVeg));
    r6.addItem(MenuItem(603, "Hummus Platter", 200, FoodType::Veg));
    r6.addItem(MenuItem(604, "Lamb Kofta", 360, FoodType::NonVeg));
    r6.addItem(MenuItem(605, "Stuffed Grape Leaves", 240, FoodType::Veg));

    Restaurant r7(7, "Soul South", "South Indian");
    r7.addItem(MenuItem(701, "Masala Dosa", 150, FoodType::Veg));
    r7.addItem(MenuItem(702, "Chicken Chettinad", 290, FoodType::NonVeg));
    r7.addItem(MenuItem(703, "Idli Sambar", 110, FoodType::Veg));
    r7.addItem(MenuItem(704, "Fish Curry", 330, FoodType::NonVeg));
    r7.addItem(MenuItem(705, "Curd Rice", 130, FoodType::Veg));

    Restaurant r8(8, "Grill Station", "American");
    r8.addItem(MenuItem(801, "Veggie Burger", 230, FoodType::Veg));
    r8.addItem(MenuItem(802, "BBQ Chicken Burger", 310, FoodType::NonVeg));
    r8.addItem(MenuItem(803, "Cheesy Fries", 170, FoodType::Veg));
    r8.addItem(MenuItem(804, "Smoked Wings", 330, FoodType::NonVeg));
    r8.addItem(MenuItem(805, "Mac & Cheese", 260, FoodType::Veg));

    Restaurant r9(9, "Thai Terrace", "Thai");
    r9.addItem(MenuItem(901, "Green Curry Tofu", 270, FoodType::Veg));
    r9.addItem(MenuItem(902, "Red Curry Chicken", 320, FoodType::NonVeg));
    r9.addItem(MenuItem(903, "Pad Thai Veg", 250, FoodType::Veg));
    r9.addItem(MenuItem(904, "Basil Chicken Rice", 300, FoodType::NonVeg));
    r9.addItem(MenuItem(905, "Mango Sticky Rice", 190, FoodType::Veg));

    Restaurant r10(10, "Paris Oven", "French");
    r10.addItem(MenuItem(1001, "Ratatouille", 280, FoodType::Veg));
    r10.addItem(MenuItem(1002, "Chicken Cordon Bleu", 390, FoodType::NonVeg));
    r10.addItem(MenuItem(1003, "French Onion Soup", 230, FoodType::Veg));
    r10.addItem(MenuItem(1004, "Herb Roast Chicken", 370, FoodType::NonVeg));
    r10.addItem(MenuItem(1005, "Mushroom Crepe", 260, FoodType::Veg));

    restaurants_ = {r1, r2, r3, r4, r5, r6, r7, r8, r9, r10};
    promos_["SAVE100"] = make_shared<FlatDiscountPromo>("SAVE100", 100);
    promos_["FEAST20"] = make_shared<PercentageDiscountPromo>("FEAST20", 20);
  }

  string restaurantsJson() const {
    ostringstream out;
    out << "[";
    for (size_t i = 0; i < restaurants_.size(); ++i) {
      const auto& r = restaurants_[i];
      if (i > 0) out << ",";
      out << "{\"id\":" << r.id()
          << ",\"name\":\"" << escapeJson(r.name())
          << "\",\"cuisine\":\"" << escapeJson(r.cuisine())
          << "\",\"menu\":[";
      for (size_t j = 0; j < r.menu().size(); ++j) {
        const auto& m = r.menu()[j];
        if (j > 0) out << ",";
        out << "{\"id\":" << m.id()
            << ",\"name\":\"" << escapeJson(m.name())
            << "\",\"price\":" << m.price()
            << ",\"type\":\"" << foodTypeToString(m.type()) << "\"}";
      }
      out << "]}";
    }
    out << "]";
    return out.str();
  }

  string promosJson() const {
    ostringstream out;
    out << "{";
    bool first = true;
    for (const auto& [code, promo] : promos_) {
      if (!first) out << ",";
      first = false;
      out << "\"" << code << "\":{\"mode\":\"" << promo->mode() << "\",\"value\":" << promo->value() << "}";
    }
    out << "}";
    return out.str();
  }

  string createOrderJson(const string& body) {
    const bool hasItems = body.find("\"items\"") != string::npos;
    if (!hasItems) return "{\"ok\":false,\"message\":\"Invalid order payload\"}";
    const int orderId = nextOrderId_++;
    return "{\"ok\":true,\"orderId\":" + to_string(orderId) + "}";
  }

  string addFeedbackJson(const string& body) {
    feedbacks_.push_back(body);
    return "{\"ok\":true}";
  }
};

int main() {
  FoodDeliveryService service;
  httplib::Server server;

  server.set_mount_point("/", "../");

  server.Get("/api/restaurants", [&](const httplib::Request&, httplib::Response& res) {
    res.set_content(service.restaurantsJson(), "application/json");
  });

  server.Get("/api/promos", [&](const httplib::Request&, httplib::Response& res) {
    res.set_content(service.promosJson(), "application/json");
  });

  server.Post("/api/order", [&](const httplib::Request& req, httplib::Response& res) {
    res.set_content(service.createOrderJson(req.body), "application/json");
  });

  server.Post("/api/feedback", [&](const httplib::Request& req, httplib::Response& res) {
    res.set_content(service.addFeedbackJson(req.body), "application/json");
  });

  cout << "ScootEats C++ API + static server running on http://localhost:8080\n";
  cout << "Open http://localhost:8080/index.html\n";
  server.listen("0.0.0.0", 8080);
  return 0;
}
