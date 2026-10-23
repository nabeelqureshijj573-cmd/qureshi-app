import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SectionName = "home" | "app" | "features" | "pricing";

const sections: { label: string; name: SectionName }[] = [
  { label: "Home", name: "home" },
  { label: "The app", name: "app" },
  { label: "Features", name: "features" },
  { label: "Pricing", name: "pricing" },
];

const stats = [
  { value: "50k+", label: "active businesses" },
  { value: "10k+", label: "five-star reviews" },
  { value: "80k+", label: "daily downloads" },
  { value: "24/7", label: "support when you need it" },
];

const features = [
  {
    icon: { ios: "chart.bar.fill", android: "bar_chart", web: "bar_chart" },
    title: "Know your numbers",
    body: "See sales, balances, and business trends at a glance.",
  },
  {
    icon: { ios: "bolt.fill", android: "bolt", web: "bolt" },
    title: "Move money quickly",
    body: "Pay suppliers and transfer funds without slowing down.",
  },
  {
    icon: {
      ios: "lock.shield.fill",
      android: "verified_user",
      web: "verified_user",
    },
    title: "Stay in control",
    body: "Smart security keeps your account protected around the clock.",
  },
  {
    icon: { ios: "person.2.fill", android: "people", web: "people" },
    title: "Bring everyone along",
    body: "Give your team the tools they need, with clear permissions.",
  },
] as const;

const quickActionSymbols = [
  { ios: "arrow.up.right", android: "north_east", web: "north_east" },
  { ios: "arrow.down.left", android: "south_west", web: "south_west" },
  { ios: "ellipsis", android: "more_horiz", web: "more_horiz" },
] as const;

const phoneTabSymbols = [
  { ios: "square.grid.2x2.fill", android: "grid_view", web: "grid_view" },
  { ios: "creditcard.fill", android: "credit_card", web: "credit_card" },
  {
    ios: "chart.line.uptrend.xyaxis",
    android: "show_chart",
    web: "show_chart",
  },
  { ios: "person.fill", android: "person", web: "person" },
] as const;

function BrandMark() {
  return (
    <View style={styles.brand}>
      <View style={styles.brandIcon}>
        <Text style={styles.brandIconText}>A</Text>
      </View>
      <Text style={styles.brandName}>Apika</Text>
    </View>
  );
}

function ActionButton({
  label,
  onPress,
  secondary = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        secondary && styles.secondaryButton,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.actionButtonText,
          secondary && styles.secondaryButtonText,
        ]}
      >
        {label}
      </Text>
      <SymbolView
        name={{
          ios: "arrow.right",
          android: "arrow_forward",
          web: "arrow_forward",
        }}
        size={15}
        tintColor={secondary ? "#17243B" : "#FFFFFF"}
      />
    </Pressable>
  );
}

function PhonePreview({
  kind = "overview",
  small = false,
}: {
  kind?: "overview" | "payments" | "insights";
  small?: boolean;
}) {
  const title =
    kind === "payments"
      ? "Payments"
      : kind === "insights"
        ? "Insights"
        : "Good morning";
  const mainValue =
    kind === "payments" ? "$8,240" : kind === "insights" ? "+18.6%" : "$24,680";

  return (
    <View style={[styles.phone, small && styles.smallPhone]}>
      <View style={styles.phoneScreen}>
        <View style={styles.phoneNotch} />
        <View style={styles.phoneTopline}>
          <Text style={styles.phoneWordmark}>apika</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>
        <Text style={styles.phoneGreeting}>{title}</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>
            {kind === "payments"
              ? "Paid this month"
              : kind === "insights"
                ? "Revenue growth"
                : "Total balance"}
          </Text>
          <Text style={styles.balanceValue}>{mainValue}</Text>
          <View style={styles.balanceFoot}>
            <Text style={styles.balanceFootText}>↑ 12.8% this month</Text>
            <View style={styles.balanceDot} />
          </View>
        </View>
        <View style={styles.quickActions}>
          {["Send", "Request", "More"].map((label, index) => (
            <View key={label} style={styles.quickAction}>
              <View
                style={[
                  styles.quickActionIcon,
                  index === 1 && styles.coralIcon,
                ]}
              >
                <SymbolView
                  name={quickActionSymbols[index]}
                  size={14}
                  tintColor={index === 1 ? "#FFFFFF" : "#2763E8"}
                />
              </View>
              <Text style={styles.quickActionLabel}>{label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>
            {kind === "insights" ? "Weekly sales" : "Recent activity"}
          </Text>
          <Text style={styles.activityLink}>See all</Text>
        </View>
        {kind === "insights" ? (
          <View style={styles.chart}>
            {[34, 50, 39, 66, 47, 82, 60, 74, 52, 92, 68, 84].map(
              (height, index) => (
                <View
                  key={index}
                  style={[
                    styles.chartBar,
                    index === 9 && styles.chartBarActive,
                    { height },
                  ]}
                />
              ),
            )}
          </View>
        ) : (
          <View style={styles.transactionList}>
            {[
              {
                name:
                  kind === "payments" ? "Northstar Studio" : "Juniper Market",
                category: "Today · 10:42 AM",
                amount: "+$1,280",
                color: "#DCE8FF",
              },
              {
                name:
                  kind === "payments"
                    ? "Studio Supply Co."
                    : "Studio Supply Co.",
                category: "Yesterday · 4:18 PM",
                amount: "-$240",
                color: "#FFE4DE",
              },
              {
                name: "Harbor Coffee",
                category: "Yesterday · 11:06 AM",
                amount: "+$86",
                color: "#DDF3EB",
              },
            ].map((item) => (
              <View key={item.name} style={styles.transaction}>
                <View
                  style={[
                    styles.transactionIcon,
                    { backgroundColor: item.color },
                  ]}
                >
                  <Text style={styles.transactionInitial}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.transactionCopy}>
                  <Text style={styles.transactionName}>{item.name}</Text>
                  <Text style={styles.transactionMeta}>{item.category}</Text>
                </View>
                <Text style={styles.transactionAmount}>{item.amount}</Text>
              </View>
            ))}
          </View>
        )}
        <View style={styles.phoneTabBar}>
          {phoneTabSymbols.map((name, index) => (
            <SymbolView
              key={name.ios}
              name={name}
              size={15}
              tintColor={
                index ===
                (kind === "insights" ? 2 : kind === "payments" ? 1 : 0)
                  ? "#2763E8"
                  : "#A5AFBE"
              }
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 850;
  const isCompact = width < 640;
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<Partial<Record<SectionName, number>>>({});

  function goToSection(name: SectionName) {
    scrollRef.current?.scrollTo({
      y: sectionPositions.current[name] ?? 0,
      animated: true,
    });
    setMenuOpen(false);
  }

  function rememberSection(name: SectionName) {
    return (event: { nativeEvent: { layout: { y: number } } }) => {
      sectionPositions.current[name] = event.nativeEvent.layout.y;
    };
  }

  const innerStyle = [
    styles.sectionInner,
    { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.headerInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => goToSection("home")}
            >
              <BrandMark />
            </Pressable>
            {isWide ? (
              <View style={styles.navLinks}>
                {sections.slice(1).map((section) => (
                  <Pressable
                    key={section.name}
                    onPress={() => goToSection(section.name)}
                  >
                    <Text style={styles.navLink}>{section.label}</Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Pressable
                accessibilityLabel={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                accessibilityRole="button"
                onPress={() => setMenuOpen(!menuOpen)}
                style={styles.menuButton}
              >
                <SymbolView
                  name={{
                    ios: menuOpen ? "xmark" : "line.3.horizontal",
                    android: menuOpen ? "close" : "menu",
                    web: menuOpen ? "close" : "menu",
                  }}
                  size={22}
                  tintColor="#17243B"
                />
              </Pressable>
            )}
            {isWide && (
              <ActionButton
                label="Get the app"
                onPress={() => goToSection("pricing")}
              />
            )}
          </View>
          {menuOpen && (
            <View style={styles.mobileMenu}>
              {sections.slice(1).map((section) => (
                <Pressable
                  key={section.name}
                  onPress={() => goToSection(section.name)}
                  style={styles.mobileMenuItem}
                >
                  <Text style={styles.navLink}>{section.label}</Text>
                </Pressable>
              ))}
              <ActionButton
                label="Get the app"
                onPress={() => goToSection("pricing")}
              />
            </View>
          )}
        </View>

        <View onLayout={rememberSection("home")} style={styles.heroSection}>
          <View
            style={[
              styles.sectionInner,
              styles.heroInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
              !isWide && styles.heroStack,
            ]}
          >
            <View style={[styles.heroCopy, !isWide && styles.heroCopyCentered]}>
              <View style={styles.eyebrow}>
                <View style={styles.eyebrowDot} />
                <Text style={styles.eyebrowText}>
                  Your business, made lighter
                </Text>
              </View>
              <Text
                style={[styles.heroTitle, isCompact && styles.heroTitleCompact]}
              >
                Bring your business to{"\n"}your pocket.
              </Text>
              <Text style={styles.heroDescription}>
                Money moves fast. Apika helps you stay one step ahead with a
                clearer, calmer way to run your business from anywhere.
              </Text>
              <View style={styles.heroActions}>
                <ActionButton
                  label="Explore the app"
                  onPress={() => goToSection("app")}
                />
                <Pressable
                  onPress={() => goToSection("features")}
                  style={({ pressed }) => [
                    styles.textAction,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.textActionLabel}>
                    See what you can do
                  </Text>
                  <SymbolView
                    name={{ ios: "arrow.down", android: "south", web: "south" }}
                    size={14}
                    tintColor="#2763E8"
                  />
                </Pressable>
              </View>
              <View style={styles.trustLine}>
                <View style={styles.avatarStack}>
                  {["M", "J", "S", "+"].map((item, index) => (
                    <View
                      key={item}
                      style={[
                        styles.trustAvatar,
                        {
                          backgroundColor: [
                            "#F4B5A4",
                            "#A9C4FF",
                            "#A9D6C4",
                            "#FFFFFF",
                          ][index],
                          zIndex: 4 - index,
                        },
                      ]}
                    >
                      <Text style={styles.trustAvatarText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.trustCopy}>
                  Loved by 50,000+ small businesses
                </Text>
              </View>
            </View>
            <View
              style={[styles.heroVisual, !isWide && styles.heroVisualCompact]}
            >
              <View style={styles.heroShape} />
              {isWide && (
                <View style={styles.leftPhone}>
                  <PhonePreview kind="payments" small />
                </View>
              )}
              <View style={styles.centerPhone}>
                <PhonePreview />
              </View>
              {isWide && (
                <View style={styles.rightPhone}>
                  <PhonePreview kind="insights" small />
                </View>
              )}
              <View style={styles.floatingNote}>
                <View style={styles.floatingIcon}>
                  <SymbolView
                    name={{
                      ios: "arrow.up.right",
                      android: "north_east",
                      web: "north_east",
                    }}
                    size={14}
                    tintColor="#FFFFFF"
                  />
                </View>
                <View>
                  <Text style={styles.floatingValue}>12.8%</Text>
                  <Text style={styles.floatingLabel}>revenue this month</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View
            style={[
              styles.statsInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
            ]}
          >
            {stats.map((stat, index) => (
              <View
                key={stat.label}
                style={[styles.statItem, !isWide && styles.statItemCompact]}
              >
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                {index < stats.length - 1 && isWide && (
                  <View style={styles.statDivider} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View onLayout={rememberSection("app")} style={styles.appSection}>
          <View
            style={[
              styles.sectionInner,
              styles.appInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
              !isWide && styles.appStack,
            ]}
          >
            <View style={[styles.appCopy, !isWide && styles.appCopyCentered]}>
              <Text style={styles.sectionKicker}>
                Meet your new business partner
              </Text>
              <Text style={styles.sectionTitle}>
                The whole picture.{"\n"}In the palm of your hand.
              </Text>
              <Text style={styles.sectionDescription}>
                From your first coffee to your last invoice, keep the important
                things close and the busywork out of the way.
              </Text>
              <View style={styles.benefitList}>
                {[
                  "See every account in one place",
                  "Pay people in just a few taps",
                  "Catch the small wins adding up",
                ].map((item) => (
                  <View key={item} style={styles.benefitRow}>
                    <View style={styles.checkIcon}>
                      <SymbolView
                        name={{
                          ios: "checkmark",
                          android: "check",
                          web: "check",
                        }}
                        size={12}
                        tintColor="#2763E8"
                      />
                    </View>
                    <Text style={styles.benefitText}>{item}</Text>
                  </View>
                ))}
              </View>
              <ActionButton
                label="Explore features"
                onPress={() => goToSection("features")}
                secondary
              />
            </View>
            <View style={styles.appShowcase}>
              <View style={styles.showcaseTile} />
              <PhonePreview kind="insights" />
              <View style={styles.showcaseTag}>
                <View style={styles.showcaseTagIcon}>
                  <Text style={styles.showcaseTagIconText}>+</Text>
                </View>
                <View>
                  <Text style={styles.showcaseTagTitle}>A clearer view</Text>
                  <Text style={styles.showcaseTagBody}>
                    Your business at a glance
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          onLayout={rememberSection("features")}
          style={styles.featuresSection}
        >
          <View
            style={[
              styles.sectionInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
            ]}
          >
            <View style={styles.featuresHeading}>
              <Text style={styles.sectionKicker}>Built around your day</Text>
              <Text style={[styles.sectionTitle, styles.featuresTitle]}>
                Less admin. More momentum.
              </Text>
              <Text style={styles.featuresIntro}>
                Everything you need to keep your business moving, without the
                busywork.
              </Text>
            </View>
            <View
              style={[styles.featureGrid, !isWide && styles.featureGridCompact]}
            >
              {features.map((feature, index) => (
                <View
                  key={feature.title}
                  style={[
                    styles.featureItem,
                    !isWide && styles.featureItemCompact,
                  ]}
                >
                  <View
                    style={[
                      styles.featureIcon,
                      index === 1 && styles.featureIconCoral,
                      index === 2 && styles.featureIconGreen,
                    ]}
                  >
                    <SymbolView
                      name={feature.icon}
                      size={19}
                      tintColor={
                        index === 1
                          ? "#D85D4C"
                          : index === 2
                            ? "#278866"
                            : "#2763E8"
                      }
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureBody}>{feature.body}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View
          onLayout={rememberSection("pricing")}
          style={styles.downloadSection}
        >
          <View
            style={[
              styles.sectionInner,
              styles.downloadInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
              !isWide && styles.downloadStack,
            ]}
          >
            <View style={styles.downloadCopy}>
              <Text style={styles.downloadKicker}>
                Good business starts here
              </Text>
              <Text
                style={[
                  styles.downloadTitle,
                  isCompact && styles.downloadTitleCompact,
                ]}
              >
                Make room for{"\n"}what matters.
              </Text>
              <Text style={styles.downloadBody}>
                A little less juggling. A lot more doing. Meet the app that
                keeps up with you.
              </Text>
              <View style={styles.downloadActions}>
                <ActionButton
                  label="Get started with Apika"
                  onPress={() => goToSection("home")}
                />
                <Pressable
                  onPress={() => goToSection("features")}
                  style={styles.downloadLink}
                >
                  <Text style={styles.downloadLinkText}>Compare features</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.downloadArtwork}>
              <PhonePreview kind="payments" small />
              <View style={styles.downloadCard}>
                <View style={styles.downloadCardIcon}>
                  <SymbolView
                    name={{ ios: "checkmark", android: "check", web: "check" }}
                    size={14}
                    tintColor="#FFFFFF"
                  />
                </View>
                <View>
                  <Text style={styles.downloadCardTitle}>Payment sent</Text>
                  <Text style={styles.downloadCardSubtitle}>Right on time</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View
            style={[
              styles.footerInner,
              { paddingHorizontal: isCompact ? 22 : isWide ? 54 : 36 },
            ]}
          >
            <BrandMark />
            <Text style={styles.footerNote}>
              A brighter way to do business.
            </Text>
            <Text style={styles.footerCopyright}>
              © 2026 Apika Financial, Inc.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { alignItems: "stretch" },
  header: {
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF4",
  },
  headerInner: {
    width: "100%",
    maxWidth: 1320,
    height: 78,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandIcon: {
    width: 29,
    height: 29,
    borderRadius: 8,
    backgroundColor: "#2763E8",
    alignItems: "center",
    justifyContent: "center",
  },
  brandIconText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  brandName: { color: "#15233B", fontSize: 19, fontWeight: "800" },
  navLinks: { flexDirection: "row", alignItems: "center", gap: 38 },
  navLink: { color: "#39465A", fontSize: 14, fontWeight: "600" },
  actionButton: {
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: "#2763E8",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  actionButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#CCD7E8",
  },
  secondaryButtonText: { color: "#17243B" },
  pressed: { opacity: 0.76 },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  mobileMenu: {
    alignItems: "stretch",
    paddingHorizontal: 22,
    paddingBottom: 18,
    gap: 15,
  },
  mobileMenuItem: { paddingVertical: 4 },
  sectionInner: { width: "100%", maxWidth: 1320, alignSelf: "center" },
  heroSection: { backgroundColor: "#EDF4FF", overflow: "hidden" },
  heroInner: {
    minHeight: 608,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 42,
    paddingBottom: 44,
  },
  heroStack: { flexDirection: "column", paddingTop: 58, paddingBottom: 18 },
  heroCopy: { flex: 1, maxWidth: 550, paddingRight: 22 },
  heroCopyCentered: {
    alignSelf: "stretch",
    maxWidth: 680,
    paddingRight: 0,
    alignItems: "center",
    textAlign: "center",
  },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 21,
  },
  eyebrowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2B9A78",
  },
  eyebrowText: { color: "#386B61", fontSize: 13, fontWeight: "700" },
  heroTitle: {
    maxWidth: 560,
    color: "#15233B",
    fontSize: 58,
    lineHeight: 64,
    fontWeight: "800",
  },
  heroTitleCompact: { fontSize: 42, lineHeight: 47, textAlign: "center" },
  heroDescription: {
    maxWidth: 475,
    marginTop: 22,
    color: "#5B6A80",
    fontSize: 16,
    lineHeight: 26,
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 22,
    marginTop: 30,
  },
  textAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
  },
  textActionLabel: { color: "#2763E8", fontWeight: "700", fontSize: 14 },
  trustLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 34,
  },
  avatarStack: { flexDirection: "row", paddingLeft: 2 },
  trustAvatar: {
    width: 27,
    height: 27,
    borderRadius: 14,
    marginLeft: -3,
    borderWidth: 2,
    borderColor: "#EDF4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  trustAvatarText: { color: "#26364F", fontSize: 9, fontWeight: "800" },
  trustCopy: { color: "#65738A", fontSize: 12, fontWeight: "600" },
  heroVisual: {
    width: 550,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexShrink: 0,
  },
  heroVisualCompact: { width: "100%", height: 458, maxWidth: 560 },
  heroShape: {
    position: "absolute",
    width: 390,
    height: 360,
    right: "12%",
    top: 65,
    borderRadius: 58,
    backgroundColor: "#D9E7FF",
    transform: [{ rotate: "8deg" }],
  },
  centerPhone: {
    zIndex: 3,
    position: "relative",
    transform: [{ rotate: "-2deg" }],
  },
  leftPhone: {
    zIndex: 2,
    position: "absolute",
    left: 20,
    bottom: 27,
    transform: [{ rotate: "-9deg" }],
  },
  rightPhone: {
    zIndex: 1,
    position: "absolute",
    right: 17,
    bottom: 33,
    transform: [{ rotate: "8deg" }],
  },
  phone: {
    width: 218,
    height: 432,
    borderRadius: 34,
    padding: 8,
    backgroundColor: "#111923",
    borderWidth: 1,
    borderColor: "#38424E",
    boxShadow: "0px 20px 26px rgba(24, 56, 103, 0.19)",
  },
  smallPhone: { width: 174, height: 350, padding: 7, borderRadius: 29 },
  phoneScreen: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 27,
    paddingHorizontal: 12,
    paddingTop: 18,
    backgroundColor: "#F7F9FC",
  },
  phoneNotch: {
    position: "absolute",
    top: 5,
    alignSelf: "center",
    width: 57,
    height: 14,
    borderRadius: 8,
    backgroundColor: "#111923",
    zIndex: 2,
  },
  phoneTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  phoneWordmark: { fontSize: 11, fontWeight: "800", color: "#1A2A46" },
  avatar: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: "#DDE8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#2763E8", fontSize: 9, fontWeight: "800" },
  phoneGreeting: {
    marginTop: 12,
    color: "#67768C",
    fontSize: 9,
    fontWeight: "600",
  },
  balanceCard: {
    marginTop: 8,
    height: 101,
    borderRadius: 13,
    backgroundColor: "#2763E8",
    padding: 12,
    justifyContent: "center",
  },
  balanceLabel: { color: "#DCE8FF", fontSize: 8, fontWeight: "600" },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  balanceFoot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  balanceFootText: { color: "#E3EDFF", fontSize: 7, fontWeight: "600" },
  balanceDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#75A0FF",
    borderWidth: 4,
    borderColor: "#92B4FF",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
    paddingHorizontal: 4,
  },
  quickAction: { alignItems: "center", gap: 5 },
  quickActionIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#DFE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  coralIcon: { backgroundColor: "#F47C68" },
  quickActionLabel: { color: "#56647A", fontSize: 7, fontWeight: "600" },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },
  activityTitle: { color: "#202D42", fontSize: 9, fontWeight: "800" },
  activityLink: { color: "#2763E8", fontSize: 7, fontWeight: "700" },
  transactionList: { gap: 3 },
  transaction: {
    minHeight: 39,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  transactionIcon: {
    width: 25,
    height: 25,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInitial: { color: "#34435C", fontSize: 9, fontWeight: "800" },
  transactionCopy: { flex: 1 },
  transactionName: { color: "#29374D", fontSize: 7, fontWeight: "700" },
  transactionMeta: { color: "#8A96A7", fontSize: 6, marginTop: 2 },
  transactionAmount: { color: "#27364C", fontSize: 7, fontWeight: "700" },
  chart: {
    height: 95,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingBottom: 8,
  },
  chartBar: { width: 8, borderRadius: 5, backgroundColor: "#B8CEFF" },
  chartBarActive: { backgroundColor: "#2763E8" },
  phoneTabBar: {
    height: 34,
    borderTopWidth: 1,
    borderTopColor: "#E7EBF1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "auto",
  },
  floatingNote: {
    zIndex: 4,
    position: "absolute",
    right: 2,
    bottom: 77,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 8px 16px rgba(36, 68, 111, 0.13)",
  },
  floatingIcon: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: "#2B9A78",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingValue: { color: "#17243B", fontSize: 12, fontWeight: "800" },
  floatingLabel: { color: "#8591A2", fontSize: 8, marginTop: 2 },
  statsSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF4",
    backgroundColor: "#FFFFFF",
  },
  statsInner: {
    width: "100%",
    maxWidth: 1320,
    minHeight: 135,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    paddingVertical: 18,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    minWidth: 140,
  },
  statItemCompact: { flexBasis: "50%", minWidth: 0, paddingVertical: 14 },
  statValue: { color: "#17243B", fontSize: 26, fontWeight: "800" },
  statLabel: { color: "#738198", fontSize: 11, marginTop: 4 },
  statDivider: {
    position: "absolute",
    right: 0,
    height: 40,
    width: 1,
    backgroundColor: "#E5EAF1",
  },
  appSection: { backgroundColor: "#FFFFFF" },
  appInner: {
    minHeight: 660,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 80,
  },
  appStack: {
    flexDirection: "column",
    paddingTop: 64,
    paddingBottom: 64,
    gap: 34,
  },
  appCopy: { flex: 1, maxWidth: 500, paddingRight: 30 },
  appCopyCentered: {
    alignSelf: "stretch",
    maxWidth: 650,
    paddingRight: 0,
    alignItems: "center",
  },
  sectionKicker: {
    color: "#2763E8",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#17243B",
    fontSize: 38,
    lineHeight: 45,
    fontWeight: "800",
  },
  sectionDescription: {
    color: "#65738A",
    fontSize: 15,
    lineHeight: 25,
    marginTop: 19,
    maxWidth: 430,
  },
  benefitList: { gap: 15, marginTop: 27, marginBottom: 30 },
  benefitRow: { flexDirection: "row", alignItems: "center", gap: 11 },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: "#E5EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitText: { color: "#4C5C73", fontSize: 13, fontWeight: "600" },
  appShowcase: {
    width: 470,
    height: 480,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
  },
  showcaseTile: {
    position: "absolute",
    width: 330,
    height: 355,
    right: 15,
    top: 53,
    borderRadius: 48,
    backgroundColor: "#DDEBFF",
    transform: [{ rotate: "-7deg" }],
  },
  showcaseTag: {
    position: "absolute",
    bottom: 50,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    boxShadow: "0px 8px 15px rgba(36, 68, 111, 0.12)",
  },
  showcaseTagIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#E6EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  showcaseTagIconText: { color: "#2763E8", fontSize: 21, fontWeight: "500" },
  showcaseTagTitle: { color: "#26364D", fontSize: 10, fontWeight: "800" },
  showcaseTagBody: { color: "#8793A4", fontSize: 8, marginTop: 3 },
  featuresSection: { backgroundColor: "#F3F7FA", paddingVertical: 85 },
  featuresHeading: { alignItems: "center", marginBottom: 47 },
  featuresTitle: { textAlign: "center", fontSize: 36 },
  featuresIntro: {
    color: "#748197",
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 500,
    lineHeight: 22,
  },
  featureGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 25,
  },
  featureGridCompact: { flexWrap: "wrap", gap: 0 },
  featureItem: {
    flex: 1,
    padding: 22,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    minHeight: 205,
  },
  featureItemCompact: {
    flexBasis: "50%",
    flexGrow: 0,
    paddingHorizontal: 12,
    paddingVertical: 17,
    minHeight: 200,
  },
  featureIcon: {
    width: 41,
    height: 41,
    borderRadius: 12,
    backgroundColor: "#E6EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  featureIconCoral: { backgroundColor: "#FFF0ED" },
  featureIconGreen: { backgroundColor: "#E6F4EF" },
  featureTitle: { color: "#17243B", fontSize: 15, fontWeight: "800" },
  featureBody: { color: "#748197", fontSize: 12, lineHeight: 19, marginTop: 9 },
  downloadSection: { backgroundColor: "#17243B", overflow: "hidden" },
  downloadInner: {
    minHeight: 510,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 65,
    paddingBottom: 65,
  },
  downloadStack: { flexDirection: "column", alignItems: "stretch", gap: 22 },
  downloadCopy: { flex: 1, maxWidth: 540, paddingRight: 20 },
  downloadKicker: {
    color: "#9FC0FF",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 16,
  },
  downloadTitle: {
    color: "#FFFFFF",
    fontSize: 47,
    lineHeight: 54,
    fontWeight: "800",
  },
  downloadTitleCompact: { fontSize: 38, lineHeight: 44 },
  downloadBody: {
    color: "#C1CBDA",
    fontSize: 15,
    lineHeight: 25,
    marginTop: 17,
    maxWidth: 410,
  },
  downloadActions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 27,
  },
  downloadLink: { paddingVertical: 12 },
  downloadLinkText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  downloadArtwork: {
    width: 455,
    height: 380,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
  },
  downloadCard: {
    position: "absolute",
    right: 3,
    bottom: 55,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    boxShadow: "0px 8px 14px rgba(0, 0, 0, 0.22)",
  },
  downloadCardIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "#2B9A78",
    alignItems: "center",
    justifyContent: "center",
  },
  downloadCardTitle: { color: "#26364D", fontSize: 10, fontWeight: "800" },
  downloadCardSubtitle: { color: "#8793A4", fontSize: 8, marginTop: 3 },
  footer: { backgroundColor: "#111C2E" },
  footerInner: {
    width: "100%",
    maxWidth: 1320,
    minHeight: 92,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    paddingVertical: 18,
  },
  footerNote: { color: "#BAC5D5", fontSize: 12 },
  footerCopyright: { color: "#8491A4", fontSize: 11 },
});
